<?php

require "koneksi.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Terima data dari mobile
$username = trim($data['username']);
$password = trim($data['password']);

http_response_code(201);

if ($username != '' && $password != '') {
    $query = mysqli_query($koneksi, "SELECT * FROM akun WHERE username='$username'");
    if (mysqli_num_rows($query) == 0) {
        $query = mysqli_query($koneksi, "INSERT INTO akun (username, password) VALUES ('$username', '$password');");
        if ($query) {
            $pesan = true;
        } else {
            $pesan = false;
        }
    } else {
        $pesan = false;
    }
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);