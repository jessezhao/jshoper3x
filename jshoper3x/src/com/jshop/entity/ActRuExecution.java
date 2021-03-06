package com.jshop.entity;

// Generated 2014-4-8 22:52:16 by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * ActRuExecution generated by hbm2java
 */
@Entity
@Table(name = "act_ru_execution", catalog = "jshoper3", uniqueConstraints = @UniqueConstraint(columnNames = {
		"PROC_DEF_ID_", "BUSINESS_KEY_" }))
public class ActRuExecution implements java.io.Serializable {

	private String id;
	private ActRuExecution actRuExecutionByParentId;
	private ActRuExecution actRuExecutionBySuperExec;
	private ActReProcdef actReProcdef;
	private ActRuExecution actRuExecutionByProcInstId;
	private Integer rev;
	private String businessKey;
	private String actId;
	private Byte isActive;
	private Byte isConcurrent;
	private Byte isScope;
	private Byte isEventScope;
	private Integer suspensionState;
	private Integer cachedEntState;
	private Set<ActRuVariable> actRuVariablesForProcInstId = new HashSet<ActRuVariable>(
			0);
	private Set<ActRuIdentitylink> actRuIdentitylinks = new HashSet<ActRuIdentitylink>(
			0);
	private Set<ActRuVariable> actRuVariablesForExecutionId = new HashSet<ActRuVariable>(
			0);
	private Set<ActRuEventSubscr> actRuEventSubscrs = new HashSet<ActRuEventSubscr>(
			0);
	private Set<ActRuExecution> actRuExecutionsForProcInstId = new HashSet<ActRuExecution>(
			0);
	private Set<ActRuExecution> actRuExecutionsForSuperExec = new HashSet<ActRuExecution>(
			0);
	private Set<ActRuExecution> actRuExecutionsForParentId = new HashSet<ActRuExecution>(
			0);
	private Set<ActRuTask> actRuTasksForProcInstId = new HashSet<ActRuTask>(0);
	private Set<ActRuTask> actRuTasksForExecutionId = new HashSet<ActRuTask>(0);

	public ActRuExecution() {
	}

	public ActRuExecution(String id) {
		this.id = id;
	}

	public ActRuExecution(String id, ActRuExecution actRuExecutionByParentId,
			ActRuExecution actRuExecutionBySuperExec,
			ActReProcdef actReProcdef,
			ActRuExecution actRuExecutionByProcInstId, Integer rev,
			String businessKey, String actId, Byte isActive, Byte isConcurrent,
			Byte isScope, Byte isEventScope, Integer suspensionState,
			Integer cachedEntState,
			Set<ActRuVariable> actRuVariablesForProcInstId,
			Set<ActRuIdentitylink> actRuIdentitylinks,
			Set<ActRuVariable> actRuVariablesForExecutionId,
			Set<ActRuEventSubscr> actRuEventSubscrs,
			Set<ActRuExecution> actRuExecutionsForProcInstId,
			Set<ActRuExecution> actRuExecutionsForSuperExec,
			Set<ActRuExecution> actRuExecutionsForParentId,
			Set<ActRuTask> actRuTasksForProcInstId,
			Set<ActRuTask> actRuTasksForExecutionId) {
		this.id = id;
		this.actRuExecutionByParentId = actRuExecutionByParentId;
		this.actRuExecutionBySuperExec = actRuExecutionBySuperExec;
		this.actReProcdef = actReProcdef;
		this.actRuExecutionByProcInstId = actRuExecutionByProcInstId;
		this.rev = rev;
		this.businessKey = businessKey;
		this.actId = actId;
		this.isActive = isActive;
		this.isConcurrent = isConcurrent;
		this.isScope = isScope;
		this.isEventScope = isEventScope;
		this.suspensionState = suspensionState;
		this.cachedEntState = cachedEntState;
		this.actRuVariablesForProcInstId = actRuVariablesForProcInstId;
		this.actRuIdentitylinks = actRuIdentitylinks;
		this.actRuVariablesForExecutionId = actRuVariablesForExecutionId;
		this.actRuEventSubscrs = actRuEventSubscrs;
		this.actRuExecutionsForProcInstId = actRuExecutionsForProcInstId;
		this.actRuExecutionsForSuperExec = actRuExecutionsForSuperExec;
		this.actRuExecutionsForParentId = actRuExecutionsForParentId;
		this.actRuTasksForProcInstId = actRuTasksForProcInstId;
		this.actRuTasksForExecutionId = actRuTasksForExecutionId;
	}

	@Id
	@Column(name = "ID_", unique = true, nullable = false, length = 64)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PARENT_ID_")
	public ActRuExecution getActRuExecutionByParentId() {
		return this.actRuExecutionByParentId;
	}

	public void setActRuExecutionByParentId(
			ActRuExecution actRuExecutionByParentId) {
		this.actRuExecutionByParentId = actRuExecutionByParentId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SUPER_EXEC_")
	public ActRuExecution getActRuExecutionBySuperExec() {
		return this.actRuExecutionBySuperExec;
	}

	public void setActRuExecutionBySuperExec(
			ActRuExecution actRuExecutionBySuperExec) {
		this.actRuExecutionBySuperExec = actRuExecutionBySuperExec;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PROC_DEF_ID_")
	public ActReProcdef getActReProcdef() {
		return this.actReProcdef;
	}

	public void setActReProcdef(ActReProcdef actReProcdef) {
		this.actReProcdef = actReProcdef;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PROC_INST_ID_")
	public ActRuExecution getActRuExecutionByProcInstId() {
		return this.actRuExecutionByProcInstId;
	}

	public void setActRuExecutionByProcInstId(
			ActRuExecution actRuExecutionByProcInstId) {
		this.actRuExecutionByProcInstId = actRuExecutionByProcInstId;
	}

	@Column(name = "REV_")
	public Integer getRev() {
		return this.rev;
	}

	public void setRev(Integer rev) {
		this.rev = rev;
	}

	@Column(name = "BUSINESS_KEY_")
	public String getBusinessKey() {
		return this.businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	@Column(name = "ACT_ID_")
	public String getActId() {
		return this.actId;
	}

	public void setActId(String actId) {
		this.actId = actId;
	}

	@Column(name = "IS_ACTIVE_")
	public Byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(Byte isActive) {
		this.isActive = isActive;
	}

	@Column(name = "IS_CONCURRENT_")
	public Byte getIsConcurrent() {
		return this.isConcurrent;
	}

	public void setIsConcurrent(Byte isConcurrent) {
		this.isConcurrent = isConcurrent;
	}

	@Column(name = "IS_SCOPE_")
	public Byte getIsScope() {
		return this.isScope;
	}

	public void setIsScope(Byte isScope) {
		this.isScope = isScope;
	}

	@Column(name = "IS_EVENT_SCOPE_")
	public Byte getIsEventScope() {
		return this.isEventScope;
	}

	public void setIsEventScope(Byte isEventScope) {
		this.isEventScope = isEventScope;
	}

	@Column(name = "SUSPENSION_STATE_")
	public Integer getSuspensionState() {
		return this.suspensionState;
	}

	public void setSuspensionState(Integer suspensionState) {
		this.suspensionState = suspensionState;
	}

	@Column(name = "CACHED_ENT_STATE_")
	public Integer getCachedEntState() {
		return this.cachedEntState;
	}

	public void setCachedEntState(Integer cachedEntState) {
		this.cachedEntState = cachedEntState;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByProcInstId")
	public Set<ActRuVariable> getActRuVariablesForProcInstId() {
		return this.actRuVariablesForProcInstId;
	}

	public void setActRuVariablesForProcInstId(
			Set<ActRuVariable> actRuVariablesForProcInstId) {
		this.actRuVariablesForProcInstId = actRuVariablesForProcInstId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecution")
	public Set<ActRuIdentitylink> getActRuIdentitylinks() {
		return this.actRuIdentitylinks;
	}

	public void setActRuIdentitylinks(Set<ActRuIdentitylink> actRuIdentitylinks) {
		this.actRuIdentitylinks = actRuIdentitylinks;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByExecutionId")
	public Set<ActRuVariable> getActRuVariablesForExecutionId() {
		return this.actRuVariablesForExecutionId;
	}

	public void setActRuVariablesForExecutionId(
			Set<ActRuVariable> actRuVariablesForExecutionId) {
		this.actRuVariablesForExecutionId = actRuVariablesForExecutionId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecution")
	public Set<ActRuEventSubscr> getActRuEventSubscrs() {
		return this.actRuEventSubscrs;
	}

	public void setActRuEventSubscrs(Set<ActRuEventSubscr> actRuEventSubscrs) {
		this.actRuEventSubscrs = actRuEventSubscrs;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByProcInstId")
	public Set<ActRuExecution> getActRuExecutionsForProcInstId() {
		return this.actRuExecutionsForProcInstId;
	}

	public void setActRuExecutionsForProcInstId(
			Set<ActRuExecution> actRuExecutionsForProcInstId) {
		this.actRuExecutionsForProcInstId = actRuExecutionsForProcInstId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionBySuperExec")
	public Set<ActRuExecution> getActRuExecutionsForSuperExec() {
		return this.actRuExecutionsForSuperExec;
	}

	public void setActRuExecutionsForSuperExec(
			Set<ActRuExecution> actRuExecutionsForSuperExec) {
		this.actRuExecutionsForSuperExec = actRuExecutionsForSuperExec;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByParentId")
	public Set<ActRuExecution> getActRuExecutionsForParentId() {
		return this.actRuExecutionsForParentId;
	}

	public void setActRuExecutionsForParentId(
			Set<ActRuExecution> actRuExecutionsForParentId) {
		this.actRuExecutionsForParentId = actRuExecutionsForParentId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByProcInstId")
	public Set<ActRuTask> getActRuTasksForProcInstId() {
		return this.actRuTasksForProcInstId;
	}

	public void setActRuTasksForProcInstId(
			Set<ActRuTask> actRuTasksForProcInstId) {
		this.actRuTasksForProcInstId = actRuTasksForProcInstId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actRuExecutionByExecutionId")
	public Set<ActRuTask> getActRuTasksForExecutionId() {
		return this.actRuTasksForExecutionId;
	}

	public void setActRuTasksForExecutionId(
			Set<ActRuTask> actRuTasksForExecutionId) {
		this.actRuTasksForExecutionId = actRuTasksForExecutionId;
	}

}
