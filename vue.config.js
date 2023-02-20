module.exports={
    //关闭eslint
    lintOnSave:false,

    //解决跨域问题
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:8848/brushTopicYa",
                // pathRewrite: {'^/api':''}
            }
        }
    }
}