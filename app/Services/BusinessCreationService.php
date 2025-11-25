<?php

namespace App\Services;

use App\Models\Business;
use App\Models\User;
use App\Models\Plan;
use App\Models\Transaction;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BusinessCreationService
{
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            // 1. Create Business
            $business = $this->createBusiness($data);

            // 2. Create Admin User
            $user = $this->createAdminUser($data, $business->id);

            // 3. Handle Subscription + Payment
            $plan = Plan::find($data['plan_id']);
            if ($plan) {
                $transaction = $this->createSubscriptionTransaction($business->id, $plan);
                $payment = $this->createPayment($transaction->id, $business->id, $plan->price, $data['payment_method']);
            }

            return [
                'business' => $business,
                'user'     => $user,
                'plan'     => $plan ?? null
            ];
        });
    }

    private function createBusiness($data)
    {
        return Business::create([
            'name'          => $data['business_name'],
            'start_date'    => $data['start_date'],
            'currency_id'   => $data['currency_id'],
            'timezone_id'   => $data['timezone_id'],
            'contact_number'=> $data['contact_number'],
            'country'       => $data['country'],
            'state'         => $data['state'],
            'city'          => $data['city'],
            'zip'           => $data['zip'],
            'landmark'      => $data['landmark'],
            'is_active'     => $data['is_active'],
        ]);
    }

    private function createAdminUser($data, $businessId)
    {
        return User::create([
            'name'        => $data['name'],
            'username'    => $data['username'],
            'email'       => $data['email'],
            'password'    => Hash::make($data['password']),
            'user_type'   => 'admin',
            'contact_no'  => $data['contact_no'],
            'allow_login' => $data['allow_login'] ?? 1,
            'role'        => 'admin',
            'business_id' => $businessId,
        ]);
    }

    private function createSubscriptionTransaction($businessId, $plan)
    {
        return Transaction::create([
            'business_id'     => $businessId,
            'type'            => 'subscription',
            'created_by'      => auth()->id(),
            'plan_id'         => $plan->id,
            'final_total'     => $plan->price,
            'invoice_no'      => generateInvoiceNumber(),
            'payment_status'  => 'paid',
            'source'          => 'superadmin',
            'transaction_date'=> now(),
        ]);
    }

    private function createPayment($transactionId, $businessId, $amount, $method)
    {
        return Payment::create([
            'transaction_id'  => $transactionId,
            'business_id'     => $businessId,
            'amount'          => $amount,
            'method'          => $method,
            'payment_ref_no'  => generatePaymentRef(),
        ]);
    }
}
