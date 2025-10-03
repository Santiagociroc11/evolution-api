import { InstanceDto } from '../../dto/instance.dto';
import { WAMonitoringService } from '../../services/monitoring.service';
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
} from '../../dto/community.dto';

export class CommunityController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async communityMetadata({ instanceName }: InstanceDto, jid: string) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityMetadata(jid);
  }

  public async communityCreate({ instanceName }: InstanceDto, data: CreateCommunityDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityCreate(data.subject, data.body);
  }

  public async communityCreateGroup({ instanceName }: InstanceDto, data: CreateCommunityGroupDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityCreateGroup(data.subject, data.participants, data.parentCommunityJid);
  }

  public async communityLeave({ instanceName }: InstanceDto, jid: string) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityLeave(jid);
  }

  public async communityUpdateSubject({ instanceName }: InstanceDto, jid: string, data: CommunityUpdateSubjectDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityUpdateSubject(jid, data.subject);
  }

  public async communityLinkGroup({ instanceName }: InstanceDto, data: CommunityLinkGroupDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityLinkGroup(data.groupJid, data.parentCommunityJid);
  }

  public async communityUnlinkGroup({ instanceName }: InstanceDto, data: CommunityUnlinkGroupDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityUnlinkGroup(data.groupJid, data.parentCommunityJid);
  }

  public async communityFetchLinkedGroups({ instanceName }: InstanceDto, jid: string) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityFetchLinkedGroups(jid);
  }

  public async communityRequestParticipantsList({ instanceName }: InstanceDto, jid: string) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityRequestParticipantsList(jid);
  }

  public async communityRequestParticipantsUpdate({ instanceName }: InstanceDto, jid: string, data: CommunityRequestParticipantsUpdateDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityRequestParticipantsUpdate(jid, data.participants, data.action);
  }

  public async communityParticipantsUpdate({ instanceName }: InstanceDto, jid: string, data: CommunityParticipantsUpdateDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityParticipantsUpdate(jid, data.participants, data.action);
  }

  public async communityUpdateDescription({ instanceName }: InstanceDto, jid: string, data: CommunityUpdateDescriptionDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityUpdateDescription(jid, data.description);
  }

  public async communityInviteCode({ instanceName }: InstanceDto, data: CommunityInviteCodeDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityInviteCode(data.jid);
  }

  public async communityRevokeInvite({ instanceName }: InstanceDto, data: CommunityRevokeInviteDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityRevokeInvite(data.jid);
  }

  public async communityAcceptInvite({ instanceName }: InstanceDto, data: CommunityAcceptInviteDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityAcceptInvite(data.code);
  }

  public async communityRevokeInviteV4({ instanceName }: InstanceDto, data: CommunityRevokeInviteV4Dto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityRevokeInviteV4(data.communityJid, data.invitedJid);
  }

  public async communityAcceptInviteV4({ instanceName }: InstanceDto, data: CommunityAcceptInviteV4Dto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityAcceptInviteV4(data.key, data.inviteMessage);
  }

  public async communityGetInviteInfo({ instanceName }: InstanceDto, data: CommunityGetInviteInfoDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityGetInviteInfo(data.code);
  }

  public async communityToggleEphemeral({ instanceName }: InstanceDto, jid: string, data: CommunityToggleEphemeralDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityToggleEphemeral(jid, data.ephemeralExpiration);
  }

  public async communitySettingUpdate({ instanceName }: InstanceDto, jid: string, data: CommunitySettingsDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communitySettingUpdate(jid, data.setting);
  }

  public async communityMemberAddMode({ instanceName }: InstanceDto, jid: string, data: CommunityMemberAddModeDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityMemberAddMode(jid, data.mode);
  }

  public async communityJoinApprovalMode({ instanceName }: InstanceDto, jid: string, data: CommunityJoinApprovalModeDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityJoinApprovalMode(jid, data.mode);
  }

  public async communityFetchAllParticipating({ instanceName }: InstanceDto) {
    const instance = this.waMonitor.waInstances[instanceName];
    return instance.communityFetchAllParticipating();
  }
}
