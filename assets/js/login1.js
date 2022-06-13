$(function(){
    // 当点击前往注册时显示登录按钮
    $(`#link_reg`).on(`click`,function(){
        $(`.login-box`).hide()
        $(`.reg-box`).show()
    })
    // 点击前往登录时显示注册按钮
    $(`#link_login`).on(`click`,function(){
        $(`.reg-box`).hide()
        $(`.login-box`).show()
    })
    // 获取layui里的form
    let form = layui.form
    // 自定义form.verify函数
    form.verify({
        // 密码检验
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
        rpwd:function(value){
            // 先拿到密码的值
            // 进行判断
            let pwd = $(`.reg-box [name=password]`).val()
            if(pwd !== value){
                return `两次密码不一致,请重新输入`
            }
        } 
    })
    // 创建ajax发起提交请求
    // 监听注册表单的提交事件
    var layer = layui.layer
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
   layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })
    // 创建登录表单提交事件
    $(`#form_login`).on(`submit`,function(e){
      e.preventDefault()
      $.ajax({
        url:`/api/login`,
        method:`POST`,
        data:$(this).serialize(),
        success:function(res){
          if(res.status !== 0){
            return layer.msg(`登陆失败！`)
          }
          layer.msg(`登陆成功！`)
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index1.html'
        }
      })
    })
})