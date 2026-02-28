import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Get SUPABASE_URL and SUPABASE_ANON_KEY from .env
let env = '';
try {
    env = fs.readFileSync('.env.local', 'utf-8');
} catch (err) {
    try {
        env = fs.readFileSync('.env', 'utf-8');
    } catch (err2) {
        console.error('Missing .env or .env.local file');
        process.exit(1);
    }
}

// Better parsing logic
const lines = env.split('\n');
let supabaseUrl = '';
let supabaseKey = '';

for (const line of lines) {
    if (line.trim().startsWith('VITE_SUPABASE_URL=')) {
        supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    }
    if (line.trim().startsWith('VITE_SUPABASE_ANON_KEY=')) {
        supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '');
    }
}

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrdersSchema() {
    console.log('Checking orders table schema...');

    // Try to insert a dummy record to see the error details and figure out missing columns
    const payload = {
        user_id: '309062bd-de3f-458a-ba66-cf889afb5317', // User from previous error log
        order_number: 'test_order_123',
        customer_name: 'Test Setup',
        customer_email: 'test@example.com',
        product_id: '1',
        product_name: 'Test Product',
        quantity: 1,
        total_amount: 1000,
        status: 'completed',
        created_at: new Date().toISOString()
    };

    console.log('Inserting payload:', payload);

    const { data, error } = await supabase.from('orders').insert(payload).select();

    if (error) {
        console.error('Insertion Error:', error);
    } else {
        console.log('Insertion Success:', data);

        // Clean up
        if (data && data.length > 0) {
            const { error: delErr } = await supabase.from('orders').delete().eq('order_number', 'test_order_123');
            if (delErr) {
                console.error('Cleanup Error:', delErr);
            } else {
                console.log('Cleaned up test record.');
            }
        }
    }
}

checkOrdersSchema();
