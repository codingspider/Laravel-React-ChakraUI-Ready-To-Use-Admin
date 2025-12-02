<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class NotificationSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // set to true if user is authorized
    }

    public function rules(): array
    {
        $type = $this->input('type');

        $rules = [
            'type' => ['required', Rule::in(['email', 'sms'])],
            'provider' => 'required|string|max:255',
            'is_active' => 'boolean',
        ];

        // Dynamic rules based on type
        if ($type === 'email') {
            $rules['settings.host'] = 'required|string|max:255';
            $rules['settings.port'] = 'required|integer';
            $rules['settings.username'] = 'required|string|max:255';
            $rules['settings.password'] = 'required|string|max:255';
            $rules['settings.encryption'] = 'nullable|string|in:tls,ssl';
            $rules['settings.from_email'] = 'required|email';
            $rules['settings.from_name'] = 'required|string|max:255';
        }

        if ($type === 'sms') {
            $rules['settings.sid'] = 'required|string|max:255';
            $rules['settings.token'] = 'required|string|max:255';
            $rules['settings.from'] = 'required|string|max:20';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Type is required (email or sms).',
            'provider.required' => 'Provider is required.',
            'settings.host.required' => 'SMTP host is required.',
            'settings.port.required' => 'SMTP port is required.',
            'settings.username.required' => 'Username is required.',
            'settings.password.required' => 'Password is required.',
            'settings.from_email.required' => 'From Email is required.',
            'settings.from_email.email' => 'From Email must be a valid email address.',
            'settings.from_name.required' => 'From Name is required.',
            'settings.sid.required' => 'SID / Key is required for SMS.',
            'settings.token.required' => 'Token / Secret is required for SMS.',
            'settings.from.required' => 'From Number is required for SMS.',
        ];
    }
}
