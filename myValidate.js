/**
 * 验证类型的枚举实现类
 * @type {{}}
 */
var doCheck ={
    lengthMin:function(){
        var param = into[1];
        var value = into[0];
        if(value.length < param.min){
            return '长度必须大于'+param.min;
        }else{
            return 2000;
        }
    },
    lengthMax:function(into){
        var param = into[1];
        var value = into[0];
        if(value.length > param.max){
            return '长度必须小于'+param.max;
        }else{
            return 2000;
        }
    },
    lengthBetween:function(into){
        var param = into[1];
        var value = into[0];
        var length = value.length;
        if(length > param.max || length < param.min){
            return '长度必须在[“'+param.min+'”-“'+param.max+'”]之间';
        }else{
            return 2000;
        }
    },
    between:function (into) {
        var param = into[1];
        var value = into[0];
        if(parseInt(value) > param.max || parseInt(value) < param.min){
            return '所填参数必须在[“'+param.min+'”-“'+param.max+'”]之间';
        }else{
            return 2000;
        }
    },
    max:function (into) {
        var param = into[1];
        var value = into[0];
        if(parseInt(value) > param.max){
            return '所填参数必须小于'+param.max;
        }else{
            return 2000;
        }
    },
    min:function (into) {
        var param = into[1];
        var value = into[0];
        if(parseInt(value) < param.min){
            return '所填参数必须大于'+param.min;
        }else{
            return 2000;
        }
    },
    number:function(value){
        if(parseInt(value) != value){
            return '所填参数必须是数字';
        }else{
            return 2000;
        }
    },
    require:function(value){
        if(typeof(value) == 'undefined' || value == 'undefined' || $.trim(value) == ''){
            return '参数必须填写';
        }else{
            return 2000;
        }
    },
    in:function(into){
        var param = into[1];
        var value = into[0];
        if($.inArray(value,param.in)){
            return 2000;
        }else{
            var str = "";
            if(param.in.length > 0){
                $.each(param.in,function(key,value){
                    if(key > 0){
                        str += ",";
                    }
                    str += "“"+value+"”";
                });
            }
            return '所填参数必须在['+str+']当中';
        }
    },
    //对时间格式进行验证
    time:function(){
        var regTime = /^([0-2][0-9])-([0-5][0-9])-([0-5][0-9])$/;
        if (regTime.test(value)) {
            //暂不考虑闰年闰月等情况
            if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60) && (parseInt(RegExp.$3) < 60)) {
                return 2000;
            }
        }
        return '时间格式出错';
    },
    //对日期格式进行验证
    timeDate:function(value){
        var regTime = /^([1-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])$/;
        if (regTime.test(value)) {
            //暂不考虑闰年闰月等情况
            if ((parseInt(RegExp.$1) < 2080) && (parseInt(RegExp.$2) < 13) && (parseInt(RegExp.$3) < 32)) {
                return 2000;
            }
        }
        return '日期格式出错';
    },
    //对身份证格式进行验证
    identity:function(value){
        var city = {
            11: "北京",12: "天津",13: "河北",14: "山西", 15: "内蒙古",
            21: "辽宁", 22: "吉林", 23: "黑龙江",
            31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
            41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
            50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
            61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
            71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
        };
        if (!value || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(value)) {
            return '身份证格式出错'
        } else if (!city[value.substr(0, 2)]) {
            return '身份证格式出错'
        } else {
            if (value.length == 18) {
                value = value.split('');
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = value[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != value[17].toUpperCase()) {
                    return '身份证格式出错'
                }
            }
        }
        return 2000;
    },
    char:function(value){
        if(/[^\u4e00-\u9fa5]/i.test(value)){
            return '请输入汉字';
        }else{
            return 2000;
        }
    },
    //对字符的长度进行验证
    length:function(into){
        var value = into[0];
        var param = into[1];
        if(value.length == param.length){
            return 2000;
        }else{
            return '输入长度应为'+param.length+'位';
        }
    },
    mobile:function(value){
        if(/^1[34578]\d{9}$/i.test(value)){
            return 2000;
        }else{
            return '手机号码格式出错';
        }
    },
    email:function(value){
        if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value)){
            return 2000;
        }else{
            return '邮箱格式出错';
        }
    },
    remote:function(into){
        var value = into[0];
        if(value){
            var param = into[1];
            var result = $_sync(param.url+"/"+value,{},'GET');
            if(result.data == param.trueResult){
                return 2000;
            }else{
                return param.errorMsg;
            }
        }else{
            return '请输入内容';
        }
    }
};
//定义参数的验证类
var CheckType = {
    realName:function(){
        return ['char'];
    },
    certId:function(){
        return ['number',['min',{min:1}]];
    },
    nickName:function(){
        return [['remote',{url:'/check/nickname',trueResult:1,errorMsg:"昵称不存在",field:"nickname"}]];
    },
    sex:function(){
        return [['in',{in:[1,2]}]];
    },
    birth:function(){
       return ['timeDate'];
    },
    identification:function(){
        return ['identity'];
    },
    contact:function(){
        return ['number',['length',{length:11}],'mobile'];
    },
    email:function(){
        return ['email'];
    }
};
/**
 * Created by luanPeng on 2017/8/3.
 * 自己封装的数据验证类
 */
var myValidate = {
    init:function(){
        var me = this;
        me.render();
    },
    render:function(){
        var me = this;
        me.getSupportType();
    },
    //填写验证
    singleValidate:function(id){
        //分项验证
        var me = this;
        var value = $("#"+id).val();
        return me.validateForField(id,value);
    },
    validateForField:function(id,value){
        var me = this;
        var toReturn = true;
        var checkType = [];
        if(typeof(eval("CheckType."+id)) == 'function'){
            var  getType = eval("CheckType."+id);
             checkType = new getType();
        }
        if($(".forRequire[data-for="+id+"]").css("display") == 'block') {
            checkType.push('require');
        }
        if(checkType.length > 0){
            //是否为必填字段非必填字段不验证
            $.each(checkType, function (key, vv) {
                //参数检查
                var haveParam = 'object' == typeof(vv) ? true : false;
                var functionName = haveParam == true ? vv[0] : vv;
                var isTypeSupport = $.inArray(functionName, me.supportType);
                if (isTypeSupport >= 0) {
                    var into = haveParam == true ? [value, vv[1]] : value;
                    var result = eval("doCheck." + functionName + "(" + JSON.stringify(into) + ")");
                    if (result !== 2000) {
                        //报错显示
                        $(".us-tip[data-for=" + id + "]").html(result);
                        toReturn = false;
                        return false;
                    } else {
                        $(".us-tip[data-for=" + id + "]").html('');
                    }
                }
            });
        }
        return toReturn;
    },
    //提交验证
    doValidate:function(){
        var me = this;
        var allPut = $("#postForm").find("input");
        var isTrue = true;
        var allData = "({";
        for(var i = 0;i<allPut.length;i++){
            var nowObj = allPut.eq(i);
            var id = nowObj.attr('id');
            var name = nowObj.attr('name');
            var type = nowObj.attr('type');
            var value;
            if(type == 'radio'){
                value = $("input[name='"+name+"']:checked").val(); //性别
            }else if(type == 'text'){
                value= nowObj.val();
            }else{
                value = '';
            }
            var vReturn = me.validateForField(id,value);
            if(!vReturn){
                //只要有一个报错就永远错
                isTrue = false;
            }
            if(i > 0){
                allData += ",";
            }
            allData += name+":'"+value+"'";
        }
        if(isTrue){
            allData += "})";
            return eval(allData);
        }else{
            return isTrue;
        }
    },
    //加载支持的验证方式
    getSupportType:function(){
        var me = this;
        me.supportType = [
            'require','number','min','max','between','in','length',
            'lengthBetween','lengthMax','lengthMin','email',
            'mobile','char','time','identity','timeDate','remote'
        ];
    }
};