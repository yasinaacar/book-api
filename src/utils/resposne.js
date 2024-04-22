class Response{
    constructor(data=null, message=null){
        this.data=data,
        this.message=message
    };

    success(res){
        return res.status(200).json({
            success: true,
            datas: this.data,
            message: this.message ?? "Transaction completed successfully"
        });
    };

    created(res){
        return res.status(201).json({
            success: true,
            datas: this.data,
            message: this.message ?? "Created successfully"
        });
    };

    error400(res){
        return res.status(400).json({
            success: false,
            message: this.message ?? "Bad request! Check the sended value"
        });
    };

    error401(res){
        return res.status(401).json({
            success: false,
            message: this.message ?? "Unauthorized! You don't have a access. Log in with authorized account"
        });
    };

    error404(res){
        return res.status(404).json({
            success: false,
            message: this.message ?? "404 not found"
        });
    };

    error429(res){
        return res.status(429).json({
            success: false,
            message: this.message ?? "To many request"
        });
    };

    error500(res){
        return res.status(500).json({
            success: false,
            message: this.message ?? "500 Internal Server Error"
        });
    }

};

module.exports=Response;