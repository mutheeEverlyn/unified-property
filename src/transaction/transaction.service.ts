import axios from "axios";
import { Column, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { transactionsTable, tsTransactions, tiTransactions } from "../drizzle/schema";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const MPESA_BASE_URL = "https://sandbox.safaricom.co.ke";
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const SHORTCODE = process.env.MPESA_SHORTCODE!;
const PASSKEY = process.env.MPESA_PASSKEY!;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL!;

// Function to generate MPesa access token
const getMpesaAccessToken = async (): Promise<string | null> => {
    try {
        const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
        const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error("MPesa Token Error:", error);
        return null;
    }
};

// Function to initiate MPesa STK Push
export const initiateMpesaPayment = async (phone: string, amount: number, transactionId: number) => {
    const token = await getMpesaAccessToken();
    if (!token) throw new Error("Failed to get MPesa access token");

    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").substring(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");

    const payload = {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone, // Customer's phone number
        PartyB: SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: `TXN-${transactionId}`,
        TransactionDesc: "Property Payment",
    };

    try {
        const response = await axios.post(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("MPesa STK Push Error:", error);
        throw new Error("MPesa STK Push Failed");
    }
};

export const createTransactionsService = async (transactions: tiTransactions): Promise<string> => {
    const insertedTransaction = await db.insert(transactionsTable)
        .values(transactions)
        .returning({ transaction_id: transactionsTable.transaction_id }); // Get the inserted ID

    const transactionId = insertedTransaction[0]?.transaction_id;
    if (!transactionId) {
        throw new Error("Failed to retrieve transaction ID after insertion");
    }

    // Initiate MPesa Payment
    await initiateMpesaPayment(transactions.phone_number, transactions.amount, transactionId);

    return "Transaction created and MPesa payment initiated";
};
