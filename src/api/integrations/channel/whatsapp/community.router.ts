import { RouterBroker } from '../../routes/index';
import { InstanceDto } from '../../dto/instance.dto';
import { CommunityController } from './community.controller';
import { WAMonitoringService } from '../../services/monitoring.service';
import { InstanceGuard } from '../../guards/instance.guard';
import { ApiKeyGuard } from '../../guards/apikey.guard';
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
import {
  createCommunitySchema,
  createCommunityGroupSchema,
  communityParticipantsUpdateSchema,
  communitySettingsSchema,
  communityMemberAddModeSchema,
  communityJoinApprovalModeSchema,
  communityUpdateSubjectSchema,
  communityUpdateDescriptionSchema,
  communityLinkGroupSchema,
  communityUnlinkGroupSchema,
  communityInviteCodeSchema,
  communityRevokeInviteSchema,
  communityAcceptInviteSchema,
  communityRevokeInviteV4Schema,
  communityAcceptInviteV4Schema,
  communityGetInviteInfoSchema,
  communityToggleEphemeralSchema,
  communityFetchLinkedGroupsSchema,
  communityRequestParticipantsUpdateSchema,
} from '../../validate/community.schema';

export class CommunityRouter extends RouterBroker {
  constructor(
    private readonly waMonitor: WAMonitoringService,
    ...guards: any[]
  ) {
    super();
    this.router.use(InstanceGuard);
    this.router.use(ApiKeyGuard);

    const communityController = new CommunityController(waMonitor);

    // ==================== COMMUNITY METADATA ====================
    this.router.get(
      this.routerPath('metadata/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: {},
          ClassRef: InstanceDto,
          execute: (instance) => communityController.communityMetadata(instance, req.params.jid),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY CREATE ====================
    this.router.post(
      this.routerPath('create'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CreateCommunityDto>({
          request: req,
          schema: createCommunitySchema,
          ClassRef: CreateCommunityDto,
          execute: (instance, data) => communityController.communityCreate(instance, data),
        });
        res.status(201).json(response);
      },
    );

    // ==================== COMMUNITY CREATE GROUP ====================
    this.router.post(
      this.routerPath('createGroup'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CreateCommunityGroupDto>({
          request: req,
          schema: createCommunityGroupSchema,
          ClassRef: CreateCommunityGroupDto,
          execute: (instance, data) => communityController.communityCreateGroup(instance, data),
        });
        res.status(201).json(response);
      },
    );

    // ==================== COMMUNITY LEAVE ====================
    this.router.delete(
      this.routerPath('leave/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: {},
          ClassRef: InstanceDto,
          execute: (instance) => communityController.communityLeave(instance, req.params.jid),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY UPDATE SUBJECT ====================
    this.router.put(
      this.routerPath('updateSubject/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityUpdateSubjectDto>({
          request: req,
          schema: communityUpdateSubjectSchema,
          ClassRef: CommunityUpdateSubjectDto,
          execute: (instance, data) => communityController.communityUpdateSubject(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY LINK GROUP ====================
    this.router.post(
      this.routerPath('linkGroup'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityLinkGroupDto>({
          request: req,
          schema: communityLinkGroupSchema,
          ClassRef: CommunityLinkGroupDto,
          execute: (instance, data) => communityController.communityLinkGroup(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY UNLINK GROUP ====================
    this.router.post(
      this.routerPath('unlinkGroup'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityUnlinkGroupDto>({
          request: req,
          schema: communityUnlinkGroupSchema,
          ClassRef: CommunityUnlinkGroupDto,
          execute: (instance, data) => communityController.communityUnlinkGroup(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY FETCH LINKED GROUPS ====================
    this.router.get(
      this.routerPath('fetchLinkedGroups/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: {},
          ClassRef: InstanceDto,
          execute: (instance) => communityController.communityFetchLinkedGroups(instance, req.params.jid),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY REQUEST PARTICIPANTS LIST ====================
    this.router.get(
      this.routerPath('requestParticipantsList/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: {},
          ClassRef: InstanceDto,
          execute: (instance) => communityController.communityRequestParticipantsList(instance, req.params.jid),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY REQUEST PARTICIPANTS UPDATE ====================
    this.router.post(
      this.routerPath('requestParticipantsUpdate/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityRequestParticipantsUpdateDto>({
          request: req,
          schema: communityRequestParticipantsUpdateSchema,
          ClassRef: CommunityRequestParticipantsUpdateDto,
          execute: (instance, data) => communityController.communityRequestParticipantsUpdate(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY PARTICIPANTS UPDATE ====================
    this.router.post(
      this.routerPath('participantsUpdate/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityParticipantsUpdateDto>({
          request: req,
          schema: communityParticipantsUpdateSchema,
          ClassRef: CommunityParticipantsUpdateDto,
          execute: (instance, data) => communityController.communityParticipantsUpdate(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY UPDATE DESCRIPTION ====================
    this.router.put(
      this.routerPath('updateDescription/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityUpdateDescriptionDto>({
          request: req,
          schema: communityUpdateDescriptionSchema,
          ClassRef: CommunityUpdateDescriptionDto,
          execute: (instance, data) => communityController.communityUpdateDescription(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY INVITE CODE ====================
    this.router.post(
      this.routerPath('inviteCode'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityInviteCodeDto>({
          request: req,
          schema: communityInviteCodeSchema,
          ClassRef: CommunityInviteCodeDto,
          execute: (instance, data) => communityController.communityInviteCode(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY REVOKE INVITE ====================
    this.router.post(
      this.routerPath('revokeInvite'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityRevokeInviteDto>({
          request: req,
          schema: communityRevokeInviteSchema,
          ClassRef: CommunityRevokeInviteDto,
          execute: (instance, data) => communityController.communityRevokeInvite(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY ACCEPT INVITE ====================
    this.router.post(
      this.routerPath('acceptInvite'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityAcceptInviteDto>({
          request: req,
          schema: communityAcceptInviteSchema,
          ClassRef: CommunityAcceptInviteDto,
          execute: (instance, data) => communityController.communityAcceptInvite(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY REVOKE INVITE V4 ====================
    this.router.post(
      this.routerPath('revokeInviteV4'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityRevokeInviteV4Dto>({
          request: req,
          schema: communityRevokeInviteV4Schema,
          ClassRef: CommunityRevokeInviteV4Dto,
          execute: (instance, data) => communityController.communityRevokeInviteV4(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY ACCEPT INVITE V4 ====================
    this.router.post(
      this.routerPath('acceptInviteV4'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityAcceptInviteV4Dto>({
          request: req,
          schema: communityAcceptInviteV4Schema,
          ClassRef: CommunityAcceptInviteV4Dto,
          execute: (instance, data) => communityController.communityAcceptInviteV4(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY GET INVITE INFO ====================
    this.router.post(
      this.routerPath('getInviteInfo'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityGetInviteInfoDto>({
          request: req,
          schema: communityGetInviteInfoSchema,
          ClassRef: CommunityGetInviteInfoDto,
          execute: (instance, data) => communityController.communityGetInviteInfo(instance, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY TOGGLE EPHEMERAL ====================
    this.router.post(
      this.routerPath('toggleEphemeral/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityToggleEphemeralDto>({
          request: req,
          schema: communityToggleEphemeralSchema,
          ClassRef: CommunityToggleEphemeralDto,
          execute: (instance, data) => communityController.communityToggleEphemeral(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY SETTING UPDATE ====================
    this.router.put(
      this.routerPath('settingUpdate/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunitySettingsDto>({
          request: req,
          schema: communitySettingsSchema,
          ClassRef: CommunitySettingsDto,
          execute: (instance, data) => communityController.communitySettingUpdate(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY MEMBER ADD MODE ====================
    this.router.put(
      this.routerPath('memberAddMode/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityMemberAddModeDto>({
          request: req,
          schema: communityMemberAddModeSchema,
          ClassRef: CommunityMemberAddModeDto,
          execute: (instance, data) => communityController.communityMemberAddMode(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY JOIN APPROVAL MODE ====================
    this.router.put(
      this.routerPath('joinApprovalMode/:jid'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<CommunityJoinApprovalModeDto>({
          request: req,
          schema: communityJoinApprovalModeSchema,
          ClassRef: CommunityJoinApprovalModeDto,
          execute: (instance, data) => communityController.communityJoinApprovalMode(instance, req.params.jid, data),
        });
        res.status(200).json(response);
      },
    );

    // ==================== COMMUNITY FETCH ALL PARTICIPATING ====================
    this.router.get(
      this.routerPath('fetchAllParticipating'),
      ...guards,
      async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: {},
          ClassRef: InstanceDto,
          execute: (instance) => communityController.communityFetchAllParticipating(instance),
        });
        res.status(200).json(response);
      },
    );
  }
}
