var PLATFORM_AES_KEY = "49504159534F4F4E";
var PLATFORM_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4FNbpcWfe63umvnfQsWg1Q0gcXOd4i0y/M2MNxGedSeiUjDw315naedNsH19aBXNMaogLOWzjSbLHpc9wt0wuOFgEWATzRdipozYExEg9rWQcrAgyJh3LCtEJ58tOqANViaE8hli223tZw+TuYwV1ymlXkNsqfdpkNXj9D+RCeQIDAQAB";
function IPAYSOONEncrypt(word){  
    var key = CryptoJS.enc.Utf8.parse(PLATFORM_AES_KEY);   
    var srcs = CryptoJS.enc.Utf8.parse(word);  
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});  
    return encrypted.toString();  
}  
function IPAYSOONDecrypt(word){  
    var key = CryptoJS.enc.Utf8.parse(PLATFORM_AES_KEY);   
    var decrypted = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});  
    return decrypted.toString(CryptoJS.enc.Utf8);  
}  
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//设置cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay); //设置Date对象内部时间，iDay表示几天后。
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate.toUTCString() + ';path=/';
}
//读取cookie
function getCookie(name) {
    var arr = document.cookie.split("; "); //cookie是以键值对形式存在，用“分号空格” 隔开的，比如 a=1; b=2 ; c=3; 
    for (var i = 0, len = arr.length; i < len; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return decodeURIComponent(arr2[1]);
        };
    }
    return '';//遍历完都没找到cookie,返回空字符串
}
//清除cookie  
function clearCookie(name) {
    setCookie(name, "", -1); //设置一个过去的时间即可
}

function fmoney(s, n) {	
	if(s){
	    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	}else{
		s = 0;
	}		 
    return s;  
}
function ymoney(s) {	
	if(s){
	    s = (s/100).toFixed(2);	
	}else{
		s = 0.00;
	}
    return s;  
}
function strlen(str) {
	var realLength = 0, len = str.length, charCode = -1;
	for ( var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
}
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
var o = {   
"M+" : this.getMonth()+1,                 //月份   
"d+" : this.getDate(),                    //日   
"h+" : this.getHours(),                   //小时   
"m+" : this.getMinutes(),                 //分   
"s+" : this.getSeconds(),                 //秒   
"q+" : Math.floor((this.getMonth()+3)/3), //季度   
"S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
}  

function strToDate(str) {
	var mr = /^(\d{4})(\d{1,2})(\d{1,2})(\d{1,2})(\d{1,2})(\d{1,2})$/.exec(str);
	if (mr) {
	    var d = new Date(parseInt(mr[1], 10),
	        parseInt(mr[2], 10)-1,
	        parseInt(mr[3], 10),
	        parseInt(mr[4], 10),
	        parseInt(mr[5], 10),
	        parseInt(mr[6], 10));
		return d;
	} else {
		return null;
	}
	}

function formatDateTime(val){
	if(!val){
		return;
	}
	var newdate = strToDate(val).Format("yyyy-MM-dd hh:mm:ss");
    return newdate;
}

function formatMoneyF2Y(val){
	if(!val){
		return 0;
	}
    return (val/100).toFixed(2);
}

function formatStatus(val){
	if(!val){
		return "";
	}
	var statusId= val.toString();
	var status = "";
	switch(statusId){
	case '1':
		status="订单生成";
		break;
	case '2':
		status="订单已接受";
		break;
	case '3':
		status="订单已打回";
		break;
	case '4':
		status="等待审核";
		break;
	case '5':
		status="一次审核未通过";
		break;
	case '6':
		status="一次审核通过";
		break;
	case '7':
		status="等待二次审核";
		break;
	case '8':
		status="二次审核未通过";
		break;
	case '9':
		status="二次审核通过";
		break;
	case '10':
		status="等待提交通道";
		break;
	case '11':
		status="通道提交成功";
		break;
	case '12':
		status="通道提交失败";
		break;
	case '13':
		status="等待处理结果";
		break;
	case '14':
		status="成功";
		break;
	case '15':
		status="失败";
		break;
	case '16':
		status="等待进行实名认证";
		break;
	case '17':
		status="等待实名认证结果";
		break;
	case '18':
		status="实名认证失败";
		break;
	case '19':
		status="实名认证成功";
		break;
	case '20':
		status="等待进行白名单认证";
		break;
	case '21':
		status="等待白名单认证结果";
		break;
	case '22':
		status="白名单认证失败";
		break;
	case '23':
		status="白名单认证通过";
		break;
	case '24':
		status="等待进行白名单二次认证";
		break;
	case '25':
		status="等待白名单认证结果";
		break;
	case '26':
		status="白名单二次认证失败";
		break;
	case '27':
		status="白名单二次认证通过";
		break;
	case '28':
		status="处理中";
		break;
	case '29':
		status="超时";
		break;
	case '30':
		status="系统订单生成";
		break;
	case '31':
		status="系统订单成功";
		break;
	case '32':
		status="系统订单失败";
		break;
	case '33':
		status="结算开始";
		break;
	case '34':
		status="结算成功";
		break;
	case '35':
		status="结算失败";
		break;
	case '36':
		status="订单状态异常";
		break;
	case '37':
		status="已退款";
		break;
		default:
	}
	return status;
}
function formatAccountOperation(val){
	var operationtypeId= val.toString();
	var operationtype = "";
	switch(operationtypeId){
	case "FREEZE_INCOME":operationtype="充值"; break;
	case "COMMIT_INCOME":operationtype="充值确认"; break;
	case "FREEZE_EXPENSE":operationtype="冻结"; break;
	case "COMMIT_EXPENSE":operationtype="扣减"; break;
	case "UNFREEZE_EXPENSE":operationtype="解冻"; break;
		default:
	}
	return operationtype;
}

function formatDealType(val){
	var dealTypeId= val.toString();
	var dealtype = "";
	switch(dealTypeId){
	case "1":dealtype="单笔实时代付"; break;
	case "2":dealtype="单笔实时代收"; break;
	case "3":dealtype="单笔异步代付"; break;
	case "4":dealtype="单笔异步代收"; break;
	case "5":dealtype="批量实时代付"; break;
	case "6":dealtype="批量实时代收"; break;
	case "7":dealtype="批量异步代付"; break;
	case "8":dealtype="批量异步代收"; break;
	case "9":dealtype="单笔代付查询"; break;
	case "10":dealtype="批量代付查询"; break;
	case "11":dealtype="单笔代收查询"; break;
	case "12":dealtype="批量代收查询"; break;
	case "13":dealtype="单笔白名单查询"; break;
	case "14":dealtype="批量白名单查询"; break;
	case "15":dealtype="单笔实名认证"; break;
	case "16":dealtype="批量实名认证"; break;
	case "17":dealtype="微信扫码支付"; break;
	case "18":dealtype="微信扫码查询"; break;
	case "19":dealtype="微信刷卡支付"; break;
	case "20":dealtype="微信刷卡查询"; break;
	case "21":dealtype="微信公众号支付"; break;
	case "22":dealtype="微信公众号查询"; break;
	case "23":dealtype="微信冲正"; break;
	case "24":dealtype="微信查询"; break;
	case "25":dealtype="微信退款"; break;
	case "26":dealtype="单笔实名认证查询"; break;
	case "27":dealtype="批量实名认证查询"; break;
	case "28":dealtype="系统.账户充值"; break;
	case "29":dealtype="系统.账户提现"; break;
	case "30":dealtype="支付宝扫码支付"; break;
	case "31":dealtype="支付宝扫码查询"; break;
	case "32":dealtype="支付宝刷卡支付"; break;
	case "33":dealtype="支付宝刷卡查询"; break;
	case "34":dealtype="支付宝查询"; break;
	case "35":dealtype="支付宝退款"; break;
	case "36":dealtype="支付宝退款查询"; break;
	case "37":dealtype="支付宝口碑支付"; break;
	case "38":dealtype="支付宝口碑查询"; break;
	case "39":dealtype="支付宝冲正"; break;
	case "40":dealtype="微信退款查询"; break;
	case "41":dealtype="商户提报"; break;
	case "42":dealtype="商户提报查询"; break;
	case "43":dealtype="微信APP支付"; break;
	case "44":dealtype="微信APP查询"; break;
	case "45":dealtype="支付宝APP支付"; break;
	case "46":dealtype="支付宝APP查询"; break;
	case "47":dealtype="批量代付"; break;
	case "48":dealtype="批量代付查询"; break;
	case "49":dealtype="系统.账户解冻"; break;
		default:
	}
	return dealtype;
}
function setBankList(selection){  
    selection.append('<option value="102">中国工商银行</option>');
    selection.append('<option value="103">中国农业银行股份有限公司</option>');
    selection.append('<option value="104">中国银行总行</option>');
    selection.append('<option value="105">中国建设银行股份有限公司总行</option>');
    selection.append('<option value="301">交通银行</option>');
    selection.append('<option value="302">中信银行股份有限公司</option>');
    selection.append('<option value="303">中国光大银行</option>');
    selection.append('<option value="304">华夏银行股份有限公司总行</option>');
    selection.append('<option value="305">中国民生银行</option>');
    selection.append('<option value="306">广发银行股份有限公司</option>');
    selection.append('<option value="307">平安银行（原深圳发展银行）</option>');
    selection.append('<option value="308">招商银行股份有限公司</option>');
    selection.append('<option value="309">兴业银行总行</option>');
    selection.append('<option value="313">城市商业银行</option>');
    selection.append('<option value="314">农村商业银行</option>');
    selection.append('<option value="310">上海浦东发展银行</option>');
    selection.append('<option value="315">恒丰银行</option>');
    selection.append('<option value="316">浙商银行</option>');
    selection.append('<option value="318">渤海银行股份有限公司</option>');
    selection.append('<option value="319">徽商银行股份有限公司</option>');
    selection.append('<option value="320">镇银行</option>');
    selection.append('<option value="321">重庆三峡银行股份有限公司</option>');
    selection.append('<option value="322">上海农村商业银行</option>');
    selection.append('<option value="323">民营银行</option>');
    selection.append('<option value="325">上海银行股份有限公司</option>');
    selection.append('<option value="402">农村信用社</option>');
    selection.append('<option value="403">中国邮政储蓄银行有限责任公司</option>');
    selection.append('<option value="502">东亚银行（中国）有限公司</option>');
    selection.append('<option value="531">花旗银行(中国)有限公司</option>');
    selection.append('<option value="593">友利银行(中国)有限公司</option>');
    selection.append('<option value="595">新韩银行（中国）有限公司</option>');
    selection.append('<option value="597">韩亚银行（中国）有限公司</option>');
    selection.append('<option value="781">厦门国际银行股份有限公司</option>');
    selection.append('<option value="787">富邦华一银行有限公司</option>');
}
