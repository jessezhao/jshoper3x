package com.jshop.action.frontstage.usercenter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.InterceptorRefs;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import com.jshop.action.backstage.staticspage.DataCollectionTAction;
import com.jshop.action.backstage.utils.BaseTools;
import com.jshop.action.backstage.utils.Validate;
import com.jshop.action.backstage.utils.statickey.StaticKey;
import com.jshop.entity.DeliverAddressT;
import com.jshop.entity.MemberT;
import com.jshop.entity.UserT;
import com.jshop.service.DeliverAddressTService;
import com.jshop.service.impl.Serial;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
@ParentPackage("jshop")
@Namespace("")
@InterceptorRefs({  
    @InterceptorRef("defaultStack")  
})
public class DeliverAddressAction extends ActionSupport {
	private Serial serial;
	private DeliverAddressTService deliverAddressTService;
	private DataCollectionTAction dataCollectionTAction;
	
	private String addressid;
	private String userid;
	private String username;
	private String province;
	private String city;
	private String district;
	private String street;
	private String postcode;
	private String telno;
	private String mobile;
	private String email;
	private String state;
	private String country;

	private boolean sucflag;
	private boolean slogin;
	
	private Map<String,Object>amap=new HashMap<String,Object>();
	
	@JSON(serialize=false) 
	public DataCollectionTAction getDataCollectionTAction() {
		return dataCollectionTAction;
	}

	public void setDataCollectionTAction(DataCollectionTAction dataCollectionTAction) {
		this.dataCollectionTAction = dataCollectionTAction;
	}
	@JSON(serialize=false) 
	public DeliverAddressTService getDeliverAddressTService() {
		return deliverAddressTService;
	}

	public void setDeliverAddressTService(DeliverAddressTService deliverAddressTService) {
		this.deliverAddressTService = deliverAddressTService;
	}

	@JSON(serialize=false) 
	public Serial getSerial() {
		return serial;
	}

	public void setSerial(Serial serial) {
		this.serial = serial;
	}

	public String getAddressid() {
		return addressid;
	}

	public void setAddressid(String addressid) {
		this.addressid = addressid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getTelno() {
		return telno;
	}

	public void setTelno(String telno) {
		this.telno = telno;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	
	public boolean isSucflag() {
		return sucflag;
	}

	public void setSucflag(boolean sucflag) {
		this.sucflag = sucflag;
	}

	public boolean isSlogin() {
		return slogin;
	}

	public void setSlogin(boolean slogin) {
		this.slogin = slogin;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Map<String, Object> getAmap() {
		return amap;
	}

	public void setAmap(Map<String, Object> amap) {
		this.amap = amap;
	}

	/**
	 * 清理错误
	 */
	@Override
	public void validate() {
		this.clearErrorsAndMessages(); 
	
	}
	

	
	/**
	 * 增加用户收获地址
	 * @return
	 */
	@Action(value = "addDeliveraddress", results = { 
			@Result(name = "json",type="json")
	})
	public String addDeliveraddress(){
		UserT user=(UserT)ActionContext.getContext().getSession().get(StaticKey.MEMBER_SESSION_KEY);
		if(user!=null){
			DeliverAddressT d=new DeliverAddressT();
			d.setAddressid(this.getSerial().Serialid(Serial.DELIVERADDRESS));
			d.setMemberid(user.getUserid());
			d.setShippingusername(this.getUsername().trim());
			d.setCountry(this.getCountry().trim());
			d.setProvince(this.getProvince().trim());
			d.setCity(this.getCity().trim());
			d.setDistrict(this.getDistrict().trim());
			d.setStreet(this.getStreet().trim());
			d.setPostcode(this.getPostcode().trim());
			d.setTelno(this.getTelno());
			d.setMobile(this.getMobile());
			d.setEmail(this.getEmail().trim());
			d.setCreatetime(BaseTools.systemtime());
			d.setState("0");
			this.getDeliverAddressTService().save(d);
			this.setSucflag(true);
			return "json";
		}
		this.setSucflag(true);
		return "json";
	}
	
	/**
	 * 获取用户收获地址
	 * @return
	 */
	@Action(value = "GetUserDeliverAddress", results = { 
			@Result(name = "success",type="chain",location = "initOrder"),
			@Result(name = "input",type="redirect",location = "/html/default/shop/user/login.html")
	})
	public String GetUserDeliverAddress(){
		MemberT memberT=(MemberT) ActionContext.getContext().getSession().get(StaticKey.MEMBER_SESSION_KEY);
		if(memberT!=null){
			List<DeliverAddressT> list=this.getDeliverAddressTService().findDeliverAddressBymemberid(memberT.getId());
			ActionContext.getContext().put("deliveraddress", list);
			return SUCCESS;
		}else{
			return INPUT;
		}
		
	}
	

	/**
	 *用户在用户中心删除收获地址
	 * @return
	 */
	@Action(value = "memberDelDeliverAddress", results = { 
			@Result(name = "success",type="chain",location = "getmemberDeliverAddressForUserCenter"),
			@Result(name = "input",type="redirect",location = "/html/default/shop/user/login.html")
	})
	public String memberDelDeliverAddress(){
		MemberT memberT=(MemberT)ActionContext.getContext().getSession().get(StaticKey.MEMBER_SESSION_KEY);
		if(memberT!=null){
			if(StringUtils.isBlank(this.getAddressid())){
				return INPUT;
			}

			return SUCCESS;
			
		}else{
			return INPUT;
		}
	
	}
	
	/**
	 * 根据收获地址id删除收获地址
	 * @return
	 */
	@Action(value = "delDeliverAddressByaddressid", results = { @Result(name = "json", type = "json") })
	public String delDeliverAddressByaddressid(){
		MemberT memberT=(MemberT)ActionContext.getContext().getSession().get(StaticKey.MEMBER_SESSION_KEY);
		if(memberT!=null){
			if(StringUtils.isBlank(this.getAddressid())){
				String strs[]=StringUtils.split(this.getAddressid(), ",");
				this.getDeliverAddressTService().delDeliverAddress(strs);
				this.setSucflag(true);
				return "json";
			}
		}
		return "json";
	}
	
}
