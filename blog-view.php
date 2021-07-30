<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>ブログビュー</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/solarized-dark.min.css">
    <style>
        h1 {
            background: #dfefff;
            box-shadow: 0px 0px 0px 5px #dfefff;
            border: dashed 1px #96c2fe;
            padding: 0.2em 0.5em;
            color: #454545;
            margin-bottom: 20px;
        }
        h2 {
            background: linear-gradient(transparent 70%, #a7d6ff 70%);
            margin-bottom: 20px;
        }
        h3 {
            color: #010079;
            text-shadow: 0 0 5px white;
            padding: 0.3em 0.5em;
            background: -webkit-repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px, #e9f4ff 3px, #e9f4ff 7px);
            background: repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px, #e9f4ff 3px, #e9f4ff 7px);
            margin-bottom: 20px;
        }
        pre {
            padding: 20px;
        }
        img{
            width: 100%;
        }
    </style>
</head>

<body>

<?php
session_start();
$blog_text ='';
if (isset($_SESSION['blog_text'])) {
    $blog_text = $_SESSION['blog_text'];
}
echo $blog_text;
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" 
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous">
</script>
<script>
    MathJax={
            tex: {tags:'all'}
    };</script>
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js"></script>

</body>
</html>