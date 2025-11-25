<?php

namespace Database\Seeders;

use App\Models\Timezone;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TimezoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = getTimeZones();
        foreach($datas as $key => $value){
            Timezone::create([
                'key' => $key,
                'value' => $value,
            ]);
        }
    }
}
