<?php

require "koneksi.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Terima data dari mobile
$id = trim($data["id"]);
$nama = trim($data["nama"]);
$nomor_hp = trim($data["nomor_hp"]);

http_response_code(201);

if ($nama != "" and $nomor_hp != "") {
    $query = mysqli_query($koneksi, "UPDATE kontak SET nama='$nama', nomor_hp='$nomor_hp' WHERE id=$id");
    $pesan = true;
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);