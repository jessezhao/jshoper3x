package com.jshop.entity;

// Generated 2013-10-22 20:45:18 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * BasicsettingT generated by hbm2java
 */
@Entity
@Table(name = "basicsetting_t", catalog = "jshoper3")
public class BasicsettingT implements java.io.Serializable {

	private String id;

	public BasicsettingT() {
	}

	public BasicsettingT(String id) {
		this.id = id;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 20)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

}