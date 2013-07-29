package com.jshop.entity;

// Generated 2013-7-26 22:19:04 by Hibernate Tools 3.4.0.CR1

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * GoodsSpecificationsRelationshipT generated by hbm2java
 */
@Entity
@Table(name = "goods_specifications_relationship_t", catalog = "jshoper3")
public class GoodsSpecificationsRelationshipT implements java.io.Serializable {

	private GoodsSpecificationsRelationshipTId id;

	public GoodsSpecificationsRelationshipT() {
	}

	public GoodsSpecificationsRelationshipT(
			GoodsSpecificationsRelationshipTId id) {
		this.id = id;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "goodsSetId", column = @Column(name = "GOODS_SET_ID", nullable = false, length = 20)),
			@AttributeOverride(name = "specidicationsId", column = @Column(name = "SPECIDICATIONS_ID", nullable = false, length = 200)) })
	public GoodsSpecificationsRelationshipTId getId() {
		return this.id;
	}

	public void setId(GoodsSpecificationsRelationshipTId id) {
		this.id = id;
	}

}