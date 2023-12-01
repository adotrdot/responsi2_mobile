<?php

require "koneksi.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Terima data dari mobile
$username = trim($data["username"]);
$nama = trim($data["nama"]);
$nomor_hp = trim($data["nomor_hp"]);

http_response_code(201);

if ($nama != "" and $nomor_hp != "") {
    $query = mysqli_query($koneksi, "INSERT INTO kontak(nama, nomor_hp) VALUES('$nama', '$nomor_hp')");
    $last_id = mysqli_insert_id($koneksi);
    $query = mysqli_query($koneksi, "INSERT INTO akun_kontak(username, id_kontak) VALUES('$username', $last_id)");
    $pesan = true;
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);