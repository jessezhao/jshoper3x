$(function() {
	/**
	 * ui
	 */
	  $('input').iCheck({
		    checkboxClass: 'icheckbox_square-blue',
		    radioClass: 'iradio_square-blue',
		    increaseArea: '20%' // optional
		  });
	
	
	/**
	 * 获取商品类型下拉框
	 */
	findGoodsTypeTNForSelect = function() {
		$.ajax({
			url : "findGoodsTypeTNForSelect.action",
			type : "post",
			dataType : 'json',
			async : false,
			success : function(data) {
				if (data.goodstypetnlist != "") {
					var temp = "<option value='1'>通用商品类型</option>";
					$('#goodsTypeId').html(data.goodstypetnlist + temp);
				}
			}
		});
	},
	/**
	 * 读取商品一级分类
	 */
	findGoodsCategoryByGradeZeroone=function(){
		$('#addfl').show();
		$('#modfl').hide();
		$.ajax({
			url:"findGoodsCategoryByGradeZeroone.action",
			type:"post",
			dataType:'json',
			async:false,
			success:function(data){
				if (data.sucflag) {
					var header="<option value='-1'>---请选择---</option>";
					if (data.goodscategoryzero == "") {
						$('#parentId').append(header);
						$('#parentId1').hide();
						$('#parentId2').hide();
					} else {
						$('#parentId').append(header).append(data.goodscategoryzero);
						$('#parentId1').hide();
						$('#parentId2').hide();
					}

				}
			}
		});
	},
	/**
	 * 根据传入的商品类型id获取商品属性select类型的
	 */
	findGoodsAttributeTBygoodsTypeId = function(val) {
		$.post("findGoodsAttributeTBygoodsTypeId.action", {
			"goodsTypeId" : val
		}, function(data) {
			if (data.sucflag) {
				$('#gat').text("");
				var gathtmlheader="<div class='well'><h4>商品属性选择区域</h4></div>";
				var gathtml = "";
				var gathtmlfooter="</div>";
				var option = "";
				var attributelist = new Array();
				var length;
				if (data.gatbeanlist != null) {
					$.each(data.gatbeanlist, function(i, item) {
						attributelist = item.attributelist.split(",");
						length=attributelist.length;
						option = "<option value='0'>---请选择---</option>";
						for ( var j = 0; j <length ; j++) {
							option += "<option value='" + attributelist[j]+ "'>" + attributelist[j] + "</option>";
						}
						gathtml += "<div class='form-inline'>"
								+ "<span class='label label-required'>"
								+ item.goodsattributename + "</span>"
								+ "<select id='goodsAttrVal" + i
								+ "' name='goodsAttrVal" + i + "'>" + option
								+ "</select>" + "</div>";
						option = "";
					});
					$('#gat').append(gathtmlheader).append(gathtml).append(gathtmlfooter).show();
				}
			}
		});
	},
	
	/**
	 * 根据商品类型id获取商品参数列表
	 */
	findGoodsParameterBygoodsTypeId=function(val){
		$.post("findGoodsParameter.action",{"goodsTypeId":val},function(data){
			if(data.sucflag){
				var gathtmlheader="<div class='well'><h4>商品参数填写区域</h4></div>";
				var gathtml = "";
				var gathtmlfooter="</div>";
				$('#params').text("");

				var jsonstr=$.parseJSON(data.bean.goodsParameter);
				$.each(jsonstr,function(k,s){
					gathtml += "<div class='form-inline'>"
						+ "<span class='label label-required'>"
						+ s.name + "</span>"
						+ "<input id='"+s.id+"' name='"+s.id+"' value=''  class='small' type='text' ></input>"
						+ "</div>";
				});
				$('#params').append(gathtmlheader).append(gathtml).append(gathtmlfooter).show();
			}
		});
	}
	
	/**
	 * 获取所有商品品牌列表
	 */
	findAllBrandtjson=function(data){
		$.post("findAllBrandtjson.action",function(data){
			if(data.sucflag){
				var header="<option value='0'>---请选择---</option>";
				$("#brandname").append(header).append(data.brandjson);
			}else{
				$("#brandname").append(header);
			}
		});
	},
	/**
	 * 获取所有产品规格值列表
	 */
	findAllSpecificationsforjson=function(data){
		$.post("findAllSpecificationsforjson.action",function(data){
			if(data.sucflag){
				var header="<option value='0'>---请选择---</option><option value='1'>默认规格</option>";
				var body="";
				$(data.specificationList).each(function(k,v){
					body+="<option value='"+v.specificationsid+"'>"+v.name+"</option>";
				});
				$("#isSpecificationsOpen").append(header).append(body);
			}
		});
	},
	/**
	 * 根据规格值id获取规格值信息
	 */
	findProductSpecificationsTByspecificationsid=function(specificationsid){
		$.ajax({
    		url:'findProductSpecificationsTByspecificationsid.action', 
    		type:"post",
    		data:{"specificationsid":specificationsid},
    		dataType:'json',
    		async:false,
    		success:function(data){
    			if(data.sucflag){
    				$("#specificationtext").text(data.bean.name);
    				var html="";
    				var jsonObject=$.parseJSON(data.bean.specificationsValue);
    				if(data.bean.specificationsType=="3"){
    					//3表示颜色类型
    					$.each(jsonObject,function(k,v){
        					html+="<div style='margin-right:10px; display: inline;padding-left:90px;padding-top:5px;padding-bottom:5px;background:"+v.specifivalue+"'>" +
        								"<input  id='colortype' name='colortype' type='checkbox'  value="+v.specifivalue+"/>" +
        								"</div>";
        				});
    				}else if(data.bean.specificationsType=="2"){
    					//2表示图片类型
    					$.each(jsonObject,function(k,v){
        					html+="<div style='margin-right:10px; display: inline;padding-top:5px;padding-bottom:5px;'>" +
        								"<img width='200px' height='200px' src='../.."+v.specifivalue+"'/>" +
        								"<input id='imgtype' name='imgtype' type='checkbox'  value="+v.specifivalue+"/>" +
        								"</div>";
        				});
    				}else if(data.bean.specificationsType=="1"){
    					//1表示文字类型
    					$.each(jsonObject,function(k,v){
        					html+="<div style='margin-right:10px; display: inline;padding-top:5px;padding-bottom:5px;'>" +
        								"<span>"+v.specifivalue+"</span>" +
        								"<input id='texttype' name='texttype' type='checkbox'  value="+v.specifivalue+"/>" +
        								"</div>";
        				});
    				}
    				//在页面上保存一个规格值类型的隐藏域作为增加商品时取值使用
    				var hidspecificationsType="<input type='hidden' id='specificationsType' name='specificationsType' value='"+data.bean.specificationsType+"'></input>";
    				$("#specificationvaluearea").text("").append(html).append(hidspecificationsType);
    			}
    		
    		}
    	 });
	},
	
	
	/**
	 * 当规格选择时动态加载产品信息填充区域
	 */
	$("#isSpecificationsOpen").change(function(){
		var isSpecificationsOpen=$("#isSpecificationsOpen").val();
		var specificationsName=$("#isSpecificationsOpen").find("option:selected").text();
		if(isSpecificationsOpen=="0"){
			
			return false;
		}
		if(isSpecificationsOpen=="1"){
			//加载默认产品结构信息，即不包括任何规格值，表示商品信息对应一个产品
			$("#specificationsarea").show();
			$("#spname").text(specificationsName);
		}else{
			//动态获取规格对应的值列表【1=文字类型】【2=图片类型】【3颜色类型】
			$("#specificationsarea").show();
			findProductSpecificationsTByspecificationsid(isSpecificationsOpen);
			$("#spname").text(specificationsName);
		}
	});
	
	
	/*
	 * 当商品类型被选择时调用动态加载商品属性方法和商品参数方法
	 */
	$('#goodsTypeId').change(function(){
		var goodsTypeId=$('#goodsTypeId').val();
		findGoodsAttributeTBygoodsTypeId(goodsTypeId);
		findGoodsParameterBygoodsTypeId(goodsTypeId);
	});
	/**
	 * 级联读取一级分类的二级栏目
	 */
	$('#parentId').change(function() {
		var parentId = $('#parentId').val();
		//parentid=0表示顶级分类，parentid=-1表示请选择，也就是当都不是这两个条件时执行一级栏目对应的下级栏目的搜索
		//这里再读取二级分类内容
		if (parentId != "0" && parentId != "-1") {
			$.post("findGoodscategoryByparentId.action",{"parentId":parentId}, function(data) {
				if (data.sucflag) {
					$('#parentId1').html(data.goodscategorytwo);
				}
			});
		}
	});
	/**
	 * 级联读取二级分类对应的三级分类
	 */
	$('#parentId1').change(function(){
		var parentId = $('#parentId1').val();
		//parentid=0表示顶级分类，parentid=-1表示请选择，也就是当都不是这两个条件时执行一级栏目对应的下级栏目的搜索
		//这里再读取三级分类内容
		if (parentId != "0" && parentId != "-1") {
			$.post("findGoodscategoryStypeid.action",{"parentId":parentId}, function(data) {
				if (data.sucflag) {
					$('#parentId2').html(data.stypeidlist).show();
					
				}
			});
		}
	});
	
	
	/**
	 * 验证分类选择
	 */
	$("#parentId").change(function() {
		var parentId = $('#parentId').val();
		var parentId1 = $('#parentId1').val();
		var parentId2 = $('#parentId2').val();
		if (parentId == '-1') {
			$('#parentId1').hide();
			$('#parentId2').hide();
		} else {
			$('#parentId1').show();
		}
		if (parentId1 == "-1") {
			$('#parentId2').hide();
		}
	});
	/**
	 * 检测规格值每次每种只能选择一个规格值
	 */
	checkSpecifications=function(){
		//这里无法读取到具体的规格值是什么类型的？是图片？文字？颜色？所以只能便利判定了
		var texttypecount=0;
		$("input[name='texttype']").each(function(){
			 if($(this).attr("checked")){
				 ++texttypecount;
			 }
		});
		var imgtypecount=0;
		$("input[name='imgtype']").each(function(){
			if($(this).attr("checked")){
				 ++imgtypecount;
			 }
		});
		var colortypecount=0;
		$("input[name='colortype']").each(function(){
			if($(this).attr("checked")){
				 ++colortypecount;
			 }
		});
		
		if(texttypecount>1||imgtypecount>1||colortypecount>1){
			formwarning("#alerterror", "规格值每次每个类别只能选择一个");
			return false;
		}
		return true;
	},

	/**
	 * 获取所选的规格值
	 */
	getselectSpecificationsVal=function(){
		//这里要获取所选的规格值
		var specificationsValue="";
		var hidspecificationsType=$("#hidspecificationsType").val();
		if(hidspecificationsType=="1"){
			//文字类型【1=文字类型】【2=图片类型】【3颜色类型】
			$("input[name='texttype']").each(function(){
				if($(this).attr("checked")){
					specificationsValue+="{\"type\":\"texttype\",\"specificationsValue\":\""+this.value+"\"},";
				}
			});
			specificationsValue="["+specificationsValue.toString().substring(0, specificationsValue.length-1)+"]";
		}else if(hidspecificationsType=="2"){
			$("input[name='imgtype']").each(function(){
				if($(this).attr("checked")){
					specificationsValue+="{\"type\":\"imgtype\",\"specificationsValue\":\""+this.value+"\"},";
				}
			});
			specificationsValue="["+specificationsValue.toString().substring(0, specificationsValue.length-1)+"]";
		}else if(hidspecificationsType=="3"){
			$("input[name='colortype']").each(function(){
				if($(this).attr("checked")){
					specificationsValue+="{\"type\":\"colortype\",\"specificationsValue\":\""+this.value+"\"},";
				}
			});
			specificationsValue="["+specificationsValue.toString().substring(0, specificationsValue.length-1)+"]";
		}
		return specificationsValue;
	},
	/**
	 * 增加商品
	 */
	saveGoods=function(){
		var goodsTypeId=$("#goodsTypeId").val();//商品类型id
		var goodsTypeName=$("#goodsTypeId").find("option:selected").text();//所选商品类型名称
		//这里需要调用获取商品类型属性和参数填写的值方法
		var goodsParameterValue=getGoodsParameter(goodsTypeId);
		var goodsAttrsVals=getgoodsAttrVals(goodsTypeId);
		var navid=$("#parentId").val();
		if(navid=="-1"){
			formwarning("#alerterror", "请选择顶级商品分类");
			return false;
		}
		var nname=$("#parentId").find("option:selected").text();
		var ltypeid=$("#parentId1").val();
		if(ltypeid=="-1"){
			ltypeid=0;
			lname="";
		}
		var lname=$("#parentId1").find("option:selected").text();
		var stypeid=$("#parentId2").val();
		if(stypeid=="-1"){
			stypeid=0;
			sname="";
		}
		var sname=$('#parentId2').find("option:selected").text();
		var fname="";
		var goodsname=$("#goodsname").val();
		var usersetnum=$("#usersetnum").val();
		var brandid=$("#brandname").val();
		if(brandid=="-1"){
			formwarning("#alerterror", "请选择商品品牌");
			return false;
		}
		var brandname=$("#brandname").find("option:selected").text();
		var points=$("#points").val();
		var sort=$("#sort").val();
		var isNew=$("input[name='isNew']:checked").val();
		var recommended=$("input[name='recommended']:checked").val();
		var hotsale=$("input[name='hotsale']:checked").val();
		var bargainprice=$("input[name='bargainprice']:checked").val();
		var ismobileplatformgoods=$("input[name='ismobileplatformgoods']:checked").val();
		var salestate=$("input[name='salestate']:checked").val();
		//获取货物信息
		if(!checkSpecifications()){
			return false;
		}
		var isSpecificationsOpen=$("#isSpecificationsOpen").val();
		if(isSpecificationsOpen=="-1"){
			formwarning("#alerterror", "请选择一个规格");
			return false;
		}
		var specificationsName=$("#isSpecificationsOpen").find("option:selected").text();//所选规格值名称
		//提取选择的规格值
		var specificationsValue=getselectSpecificationsVal();
		var productName=$("#goodsname").val();
		if(productName==""){
			formwarning("#alerterror","请填写商品名称");
			return false;
		}
		var productSn=$("#productSn").val();
		var cost=$("#cost").val();
		var saleprice=$("#saleprice").val();
		var memberprice=$("#memberprice").val();
		var price=$("#price").val();
		var weight=$("#weight").val();
		var unit=$("#unit").find("option:selected").text();
		var store=$("#store").val();
		var freezeStore=$("#freezeStore").val();
		var warehouseLocation=$("#warehouseLocation").val();
		var placeStore=$("#placeStore").val();
		var isDefault=$("input[name='isDefault']:checked").val();
		var isSalestate=$("input[name='isSalestate']:checked").val();
		//获取商品图片路径集合
		var pictureurl="";
		$(":checkbox[name='pcpath'][checked=true]").each(function(){
			pictureurl+=this.value+",";
		});
		pictureurl=pictureurl.toString().substring(0, pictureurl.length-1);
		var detail=$('#detail').val();
		var commoditylist=$('#commoditylist').val();
		var metaKeywords=$('#metaKeywords').val();
		var metaDescription=$('#metaDescription').val();
		this.value="提交中";
		this.disabled=true;
		$.post("saveGoods.action",{
			"goodsTypeId":goodsTypeId,
			"goodsTypeName":goodsTypeName,
			"goodsParameterValue":goodsParameterValue,
			"goodsAttrsVals":goodsAttrsVals,
			"navid":navid,
			"nname":nname,
			"ltypeid":ltypeid,
			"lname":lname,
			"stypeid":stypeid,
			"sname":sname,
			"fname":fname,
			"goodsname":goodsname,
			"usersetnum":usersetnum,
			"brandid":brandid,
			"brandname":brandname,
			"points":points,
			"sort":sort,
			"isNew":isNew,
			"recommended":recommended,
			"hotsale":hotsale,
			"bargainprice":bargainprice,
			"ismobileplatformgoods":ismobileplatformgoods,
			"salestate":salestate,
			"isSpecificationsOpen":isSpecificationsOpen,
			"specificationsName":specificationsName,
			"productName":productName,
			"productSn":productSn,
			"cost":cost,
			"saleprice":saleprice,
			"memberprice":memberprice,
			"price":price,
			"weight":weight,
			"unit":unit,
			"store":store,
			"freezeStore":freezeStore,
			"warehouseLocation":warehouseLocation,
			"placeStore":placeStore,
			"isDefault":isDefault,
			"isSalestate":isSalestate,
			"specificationsValue":specificationsValue,
			"pictureurl":pictureurl,
			"detail":detail,
			"commoditylist":commoditylist,
			"metaKeywords":metaKeywords,
			"metaDescription":metaDescription
		},function(data){
			if(data.sucflag){
				window.location.href="goodsment.jsp?operate=find&folder=goods";
			}
		});
		
	},
	
	
	
	/**
	 * 获取30个属性值
	 */
	getgoodsAttrVals=function(goodsTypeId){
		var goodsAttrsVals="";
		if(goodsTypeId!=""){
			$("input[id^='goodsAttrVal']").each(function(){
				goodsAttrsVals+="{\"attrval\":\""+this.value+"\"},";
			});
		}
		goodsAttrsVals=goodsAttrsVals.toString().substring(0, goodsAttrsVals.length-1);
		return	goodsAttrsVals;	
	},
	
	
	/**
	 * 从页面上获取被赋值的商品参数值
	 */
	getGoodsParameter=function(goodsTypeId){
		var goodsParameterValue="";
		if(goodsTypeId!=""){
			$("input[id^='paramlistname']").each(function(){
				goodsParameterValue+="{\"id\":\""+this.name+"\",\"value\":\""+this.value+"\"},";
			});
		}
		goodsParameterValue=goodsParameterValue.toString().substring(0, goodsParameterValue.length-1);
		return goodsParameterValue;
	},
	
	$("#submit").click(function(){
		saveGoods();
	});
	
	//可能取消
	saveProductT=function(){
		var isSpecificationsOpen=$("#isSpecificationsOpen").val();//所选的规格值id
		var specificationsName=$("#isSpecificationsOpen").find("option:selected").text();//所选规格值名称
		var productName=$("#goodsname").val();
		if(productName==""){
			formwarning("#alerterror","请填写商品名称");
			return false;
		}
		var productSn=$("#productSn").val();
		var cost=$("#cost").val();
		var saleprice=$("#saleprice").val();
		var memberprice=$("#memberprice").val();
		var price=$("#price").val();
		var weight=$("#weight").val();
		var unit=$("#unit").find("option:selected").text();
		var store=$("#store").val();
		var freezeStore=$("#freezeStore").val();
		var warehouseLocation=$("#warehouseLocation").val();
		var placeStore=$("#placeStore").val();
		var isDefault=$("input[name='isDefault']:checked").val();
		var isSalestate=$("input[name='isSalestate']:checked").val();
		this.value="提交中";
		this.disabled=true;
		$.post("saveProductT.action",{
			"specificationsid":isSpecificationsOpen,
			"specificationsName":specificationsName,
			"productName":productName,
			"productSn":productSn,
			"cost":cost,
			"saleprice":saleprice,
			"memberprice":memberprice,
			"price":price,
			"weight":weight,
			"unit":unit,
			"store":store,
			"freezeStore":freezeStore,
			"warehouseLocation":warehouseLocation,
			"placeStore":placeStore,
			"isDefault":isDefault,
			"isSalestate":isSalestate
		},function(data){
			if(data.sucflag){
				$("#submitp").attr("disabled",false);
			}
		});
	}
	
	
	
	
	
	
	/**
	 * main logic
	 */
	var operate = $.query.get("operate");
	if (operate == "add") {
		findGoodsTypeTNForSelect();
		findGoodsCategoryByGradeZeroone();
		findAllBrandtjson();
		findAllSpecificationsforjson();
		
	}else if(operate=="edit"){
		findGoodsTypeTNForSelect();
		findGoodsCategoryByGradeZeroone();
		findAllBrandtjson();
		findAllSpecificationsforjson();
	}
});

/**
 * flexigrid list
 */
$(function() {
	$("#goodsmanagement").flexigrid({
		url : 'findAllGoods.action',
		dataType : 'json',
		cache : false,
		colModel : [ {
			display : '商品名称',
			name : 'goodsname',
			width : 500,
			sortable : true,
			align : 'center'
		}, {
			display : '商品编号',
			name : 'usersetnum',
			width : 150,
			sortable : true,
			align : 'center'
		}, {
			display : '会员价',
			name : 'memberprice',
			width : 120,
			sortable : true,
			align : 'center'
		}, {
			display : '分类',
			name : 'sname',
			width : 150,
			sortable : true,
			align : 'center'
		}, {
			display : '上架',
			name : 'salestate',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '新品',
			name : 'isNew',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '特价',
			name : 'bargainprice',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '热销',
			name : 'hotsale',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '推荐',
			name : 'recommended',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '库存',
			name : 'quantity',
			width : 100,
			sortable : true,
			align : 'center'
		}, {
			display : '操作',
			name : 'operating',
			width : 110,
			sortable : true,
			align : 'center'
		} ],
		buttons : [ {
			name : '添加商品',
			bclass : 'add',
			onpress : action
		}, {
			name : '添加货物',
			bclass : 'addproduct',
			onpress : action
		}, {
			name : '编辑商品',
			bclass : 'edit',
			onpress : action
		}, {
			name : '编辑货物',
			bclass : 'editproduct',
			onpress : action
		}, {
			name : '删除',
			bclass : 'delete',
			onpress : action
		}, {
			name : '上架',
			bclass : 'add',
			onpress : action
		}, {
			name : '下架',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记特价',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记热销',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记推荐',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记新品',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记移动平台',
			bclass : 'add',
			onpress : action
		}, {
			name : '重置标记',
			bclass : 'add',
			onpress : action
		}, {
			separator : true
		} ],

		searchitems : [ {
			display : '请选择搜索条件',
			name : 'sc',
			isdefault : true
		}, {
			display : '商品名称',
			name : 'goodsname'
		} ],
		sortname : "createtime",
		sortorder : "desc",
		usepager : true,
		title : '',
		useRp : true,
		rp : 20,
		rpOptions : [ 5, 20, 40, 100 ],
		showTableToggleBtn : true,
		showToggleBtn : true,
		width : 'auto',
		height : 'auto',
		pagestat : '显示{from}到{to}条，共{total}条记录',
		procmsg : '正在获取数据，请稍候...',
		checkbox : true
	});
	function action(com, grid) {
		if (com == '添加商品') {
			window.location.href = "goods.jsp?operate=add&folder=goods";
			return;

		} else if(com=="添加货物"){
			if ($('.trSelected', grid).length == 1) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str = this.id.substr(3);
				});
				window.location.href = "products/product.jsp?operate=add&folder=goods&goodsid="
						+ str;
				return;
			} else {
				formwarning("#alerterror", "请选择需要添加货物的商品");
				return false;
			}
		}else if (com == '编辑商品') {
			if ($('.trSelected', grid).length == 1) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str = this.id.substr(3);
				});
				window.location.href = "goods.jsp?operate=edit&folder=goods&goodsid="
						+ str;
				return;
			} else {
				formwarning("#alerterror", "请选择一条信息");
				return false;
			}
		} else if (com == '编辑货物') {
			if ($('.trSelected', grid).length == 1) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str = this.id.substr(3);
				});
				window.location.href = "products/product.jsp?operate=editd&folder=goods&goodsid="
						+ str;
				return;
			} else {
				formwarning("#alerterror", "请选择需要编辑货物的商品");
				return false;
			}
		} else if (com == '删除') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				$.post("delGoods.action", {
					"goodsid" : str
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "删除商品成功");
					}
				});
			} else {
				formwarning("#alerterror", "请选择要删除的信息");
				return false;
			}
		} else if (com == '标记特价') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var bargainprice = "1";
				$.post("updateGoodsbargainprice.action", {
					"goodsid" : str,
					"bargainprice" : bargainprice
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "标记特价成功");
					}
				});

			} else {
				formwarning("#alerterror", "请选择要标记特价的信息");
				return false;
			}
		} else if (com == '标记热销') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var hotsale = "1";
				$.post("updateGoodshotsale.action", {
					"goodsid" : str,
					"hotsale" : hotsale
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "标记热销成功");
					}
				});

			} else {
				formwarning("#alerterror", "请选择要标记热销的信息");
				return false;
			}
		} else if (com == '标记推荐') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var recommended = "1";
				$.post("updateGoodsrecommended.action", {
					"goodsid" : str,
					"recommended" : recommended
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "标记推荐成功");
					}
				});

				return;
			} else {
				formwarning("#alerterror", "请选择要标记推荐的信息");
				return false;
			}
		} else if (com == '标记新品') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var isNew = "1";
				$.post("updateGoodsisNew.action", {
					"goodsid" : str,
					"isNew" : isNew
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "标记新品成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要标记新品的信息");
				return false;
			}
		} else if (com == '标记移动平台') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var ismobileplatformgoods = "1";
				$.post("updateGoodsismobileplatformgoods.action", {
					"goodsid" : str,
					"ismobileplatformgoods" : ismobileplatformgoods
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "标记移动平台成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要标记移动平台的信息");
				return false;
			}
		} else if (com == '重置标记') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var recommended = "0";
				var hotsale = "0";
				var bargainprice = "0";
				var isNew = "0";
				var ismobileplatformgoods = "0";
				$.post("updateFiveGoodsState.action", {
					"goodsid" : str,
					"recommended" : recommended,
					"hotsale" : hotsale,
					"bargainprice" : bargainprice,
					"isNew" : isNew,
					"ismobileplatformgoods" : ismobileplatformgoods
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "重置标记成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要重置标记的信息");
				return false;
			}
		} else if (com == '上架') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var salestate = "1";
				$.post("updateGoodsSaleState.action", {
					"goodsid" : str,
					"salestate" : salestate
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "上架成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要上架的信息");
				return false;
			}
		} else if (com == '下架') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var salestate = "0";
				$.post("updateGoodsSaleState.action", {
					"goodsid" : str,
					"salestate" : salestate
				}, function(data) {
					if (data.sucflag) {
						$('#goodsmanagement').flexReload();
						forminfo("#alertinfo", "下架成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要下架的信息");
				return false;
			}

		}

	}
});