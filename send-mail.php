<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = htmlspecialchars($_POST["firstName"]);
    $lastName  = htmlspecialchars($_POST["lastName"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "clara.morais1811@gmail.com"; // 🔥 MET TON MAIL
    $subject = "Nouveau message depuis LED'Zart";

    $body = "Nom: $firstName $lastName\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: contacts.html?success=1");
        exit();
    } else {
        header("Location: contacts.html?error=1");
        exit();
    }
}
?>
