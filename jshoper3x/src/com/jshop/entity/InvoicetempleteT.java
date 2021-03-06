package com.jshop.entity;

// Generated 2014-4-8 22:52:16 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * InvoicetempleteT generated by hbm2java
 */
@Entity
@Table(name = "invoicetemplete_t", catalog = "jshoper3")
public class InvoicetempleteT implements java.io.Serializable {

	private String invoicetempleteid;
	private String logisticsid;
	private String state;
	private String code;

	public InvoicetempleteT() {
	}

	public InvoicetempleteT(String invoicetempleteid, String state, String code) {
		this.invoicetempleteid = invoicetempleteid;
		this.state = state;
		this.code = code;
	}

	public InvoicetempleteT(String invoicetempleteid, String logisticsid,
			String state, String code) {
		this.invoicetempleteid = invoicetempleteid;
		this.logisticsid = logisticsid;
		this.state = state;
		this.code = code;
	}

	@Id
	@Column(name = "INVOICETEMPLETEID", unique = true, nullable = false, length = 20)
	public String getInvoicetempleteid() {
		return this.invoicetempleteid;
	}

	public void setInvoicetempleteid(String invoicetempleteid) {
		this.invoicetempleteid = invoicetempleteid;
	}

	@Column(name = "LOGISTICSID", length = 20)
	public String getLogisticsid() {
		return this.logisticsid;
	}

	public void setLogisticsid(String logisticsid) {
		this.logisticsid = logisticsid;
	}

	@Column(name = "STATE", nullable = false, length = 1)
	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Column(name = "CODE", nullable = false, length = 65535)
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
