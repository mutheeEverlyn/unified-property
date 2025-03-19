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

    // Format the phone number to international format
    const formattedPhone = phone.startsWith("0") ? `254${phone.substring(1)}` : phone;

    const payload = {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone, // Customer's phone number in international format
        PartyB: SHORTCODE,
        PhoneNumber: formattedPhone,
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
        if (axios.isAxiosError(error)) {
            console.error("MPesa STK Push Error:", error.response ? error.response.data : error.message);
        } else {
            console.error("MPesa STK Push Error:", error);
        }
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

// Define the missing functions
export const transactionsService = async (limit: number) => {
    // Implement the logic to fetch transactions with a limit
    return await db.select().from(transactionsTable).limit(limit);
};

export const getTransactionsService = async (id: number) => {
    // Implement the logic to fetch a transaction by ID
    const result = await db.select().from(transactionsTable).where(eq(transactionsTable.transaction_id, id)).limit(1);
    return result[0]; // Return the first (and only) result
};

export const updateTransactionsService = async (id: number, transactions: tiTransactions) => {
    // Implement the logic to update a transaction by ID
    return await db.update(transactionsTable).set(transactions).where(eq(transactionsTable.transaction_id, id));
};

export const deleteTransactionsService = async (id: number) => {
    // Implement the logic to delete a transaction by ID
    return await db.delete(transactionsTable).where(eq(transactionsTable.transaction_id, id));
};

export const transactionsData = async () => {
    // Implement the logic to fetch all transactions
    return await db.query.transactionsTable.findMany({
        columns:{
         transaction_id:true,
         amount:true,
         phone_number:true,
        status:true,
        transaction_date:true
        },with:{
        purchase:{
            columns:{
              purchase_id:true,
              location_id:true,
              total_amount:true,
                purchase_status:true,
                property_type:true,
                property_id:true,
            }
        },
        user:{
            columns:{
                user_id:true,
                address:true,
                contact_phone:true,
                created_at:true,
                updated_at:true,
                full_name:true,
                email:true,
            }
        }
        }
})
};