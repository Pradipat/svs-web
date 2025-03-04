<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $userEmail = $_POST["email"];
    $pdfFile = $_FILES["pdf_file"];

    // ตรวจสอบไฟล์ PDF
    if ($pdfFile["error"] == 0) {
        sendEmailWithAttachment($name, $userEmail, $pdfFile);
    } else {
        echo "เกิดข้อผิดพลาดในการอัปโหลดไฟล์!";
    }
}

// ฟังก์ชันส่งอีเมล
function sendEmailWithAttachment($name, $userEmail, $pdfFile) {
    $mail = new PHPMailer(true);

    try {
        // ตั้งค่า SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'kongkiat.hir@gmail.com'; // อีเมลของคุณ
        $mail->Password = '@Password1978'; // ควรใช้ App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // ตั้งค่าผู้ส่ง
        $mail->setFrom('kongkiat.hir@gmail.com', 'Your System');

        // เพิ่มอีเมลผู้รับ (แก้ไขเป็นอีเมลที่ต้องการส่งไป)
        $mail->addAddress('sunplex.info@gmail.com', 'Admin 1');
        $mail->addAddress('kittipan.y@siamvayupak.com', 'Admin 2');

        // ตั้งค่าหัวข้อและเนื้อหาอีเมล
        $mail->Subject = 'สมัครงาน สมัครฝึกงาน ฝึกสหกิจ';
        $mail->Body = "มีข้อมูลใหม่จากผู้สมัคร:\n\nชื่อ-สกุล: $name\nอีเมล: $userEmail\n\nโปรดตรวจสอบไฟล์แนบ";

        // แนบไฟล์ PDF
        $mail->addAttachment($pdfFile["tmp_name"], $pdfFile["name"]);

        // ส่งอีเมล
        $mail->send();
        echo "อีเมลถูกส่งเรียบร้อย!";
    } catch (Exception $e) {
        echo "การส่งอีเมลล้มเหลว: {$mail->ErrorInfo}";
    }
}
?>