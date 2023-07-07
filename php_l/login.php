<?php
// 定义数据库连接信息
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

// 获取POST请求中的用户名和密码
$username = $_POST['username'];
$password = $_POST['password'];

// 查询数据库中是否存在匹配的用户名和密码
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

// 检查查询结果
if ($result->num_rows > 0) {
    // 登录成功
    $response = array(
        'status' => 'success',
        'message' => '登录成功'
    );
} else {
    // 登录失败
    $response = array(
        'status' => 'error',
        'message' => '用户名或密码错误'
    );
}

// 将响应数据以JSON格式返回
header("Content-type:text/html; charset=utf-8");
echo json_encode($response);

// 关闭数据库连接
$conn->close();
