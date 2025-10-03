import { InstanceDto } from '@api/dto/instance.dto';
import { WAMonitoringService } from '@api/services/monitor.service';
import { createJid } from '@utils/createJid';
import {
  CreateCommunityDto,
  CreateCommunityGroupDto,
  CommunityParticipantsUpdateDto,
  CommunitySettingsDto,
  CommunityMemberAddModeDto,
  CommunityJoinApprovalModeDto,
  CommunityUpdateSubjectDto,
  CommunityUpdateDescriptionDto,
  CommunityLinkGroupDto,
  CommunityUnlinkGroupDto,
  CommunityInviteCodeDto,
  CommunityRevokeInviteDto,
  CommunityAcceptInviteDto,
  CommunityRevokeInviteV4Dto,
  CommunityAcceptInviteV4Dto,
  CommunityGetInviteInfoDto,
  CommunityToggleEphemeralDto,
  CommunityFetchLinkedGroupsDto,
  CommunityRequestParticipantsUpdateDto,
} from '@api/dto/community.dto';

export class CommunityController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async communityMetadata(instance: InstanceDto, jid: string) {
    return await this.waMonitor.waInstances[instance.instanceName].communityMetadata(jid);
  }

  public async communityCreate(instance: InstanceDto, data: CreateCommunityDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityCreate(data.subject, data.body);
  }

  public async communityCreateGroup(instance: InstanceDto, data: CreateCommunityGroupDto) {
    const participants = data.participants.map(p => createJid(p));
    return await this.waMonitor.waInstances[instance.instanceName].communityCreateGroup(data.subject, participants, data.parentCommunityJid);
  }

  public async communityLeave(instance: InstanceDto, jid: string) {
    return await this.waMonitor.waInstances[instance.instanceName].communityLeave(jid);
  }

  public async communityUpdateSubject(instance: InstanceDto, jid: string, data: CommunityUpdateSubjectDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityUpdateSubject(jid, data.subject);
  }

  public async communityLinkGroup(instance: InstanceDto, data: CommunityLinkGroupDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityLinkGroup(data.groupJid, data.parentCommunityJid);
  }

  public async communityUnlinkGroup(instance: InstanceDto, data: CommunityUnlinkGroupDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityUnlinkGroup(data.groupJid, data.parentCommunityJid);
  }

  public async communityFetchLinkedGroups(instance: InstanceDto, jid: string) {
    return await this.waMonitor.waInstances[instance.instanceName].communityFetchLinkedGroups(jid);
  }

  public async communityRequestParticipantsList(instance: InstanceDto, jid: string) {
    return await this.waMonitor.waInstances[instance.instanceName].communityRequestParticipantsList(jid);
  }

  public async communityRequestParticipantsUpdate(instance: InstanceDto, jid: string, data: CommunityRequestParticipantsUpdateDto) {
    const participants = data.participants.map(p => createJid(p));
    return await this.waMonitor.waInstances[instance.instanceName].communityRequestParticipantsUpdate(jid, participants, data.action);
  }

  public async communityParticipantsUpdate(instance: InstanceDto, jid: string, data: CommunityParticipantsUpdateDto) {
    const participants = data.participants.map(p => createJid(p));
    return await this.waMonitor.waInstances[instance.instanceName].communityParticipantsUpdate(jid, participants, data.action);
  }

  public async communityUpdateDescription(instance: InstanceDto, jid: string, data: CommunityUpdateDescriptionDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityUpdateDescription(jid, data.description);
  }

  public async communityInviteCode(instance: InstanceDto, data: CommunityInviteCodeDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityInviteCode(data.jid);
  }

  public async communityRevokeInvite(instance: InstanceDto, data: CommunityRevokeInviteDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityRevokeInvite(data.jid);
  }

  public async communityAcceptInvite(instance: InstanceDto, data: CommunityAcceptInviteDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityAcceptInvite(data.code);
  }

  public async communityRevokeInviteV4(instance: InstanceDto, data: CommunityRevokeInviteV4Dto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityRevokeInviteV4(data.communityJid, data.invitedJid);
  }

  public async communityAcceptInviteV4(instance: InstanceDto, data: CommunityAcceptInviteV4Dto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityAcceptInviteV4(data.key, data.inviteMessage);
  }

  public async communityGetInviteInfo(instance: InstanceDto, data: CommunityGetInviteInfoDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityGetInviteInfo(data.code);
  }

  public async communityToggleEphemeral(instance: InstanceDto, jid: string, data: CommunityToggleEphemeralDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityToggleEphemeral(jid, data.ephemeralExpiration);
  }

  public async communitySettingUpdate(instance: InstanceDto, jid: string, data: CommunitySettingsDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communitySettingUpdate(jid, data.setting);
  }

  public async communityMemberAddMode(instance: InstanceDto, jid: string, data: CommunityMemberAddModeDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityMemberAddMode(jid, data.mode);
  }

  public async communityJoinApprovalMode(instance: InstanceDto, jid: string, data: CommunityJoinApprovalModeDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityJoinApprovalMode(jid, data.mode);
  }

  public async communityFetchAllParticipating(instance: InstanceDto) {
    return await this.waMonitor.waInstances[instance.instanceName].communityFetchAllParticipating();
  }
}