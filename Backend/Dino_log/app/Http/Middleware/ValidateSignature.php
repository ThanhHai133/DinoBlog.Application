<?php

namespace App\Http\Middleware;

use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * The names of the parameters that should not be included in the signature.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Danh sách các tham số bạn muốn loại khỏi chữ ký (nếu cần)
    ];
}