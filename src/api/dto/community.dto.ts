export class CreateCommunityDto {
  subject: string;
  body: string;
}

export class CreateCommunityGroupDto {
  subject: string;
  participants: string[];
  parentCommunityJid: string;
}

export class CommunityParticipantsUpdateDto {
  participants: string[];
  action: 'add' | 'remove' | 'promote' | 'demote';
}

export class CommunitySettingsDto {
  setting: 'announcement' | 'not_announcement' | 'locked' | 'unlocked';
}

export class CommunityMemberAddModeDto {
  mode: 'admin_add' | 'all_member_add';
}

export class CommunityJoinApprovalModeDto {
  mode: 'on' | 'off';
}

export class CommunityUpdateSubjectDto {
  subject: string;
}

export class CommunityUpdateDescriptionDto {
  description?: string;
}

export class CommunityLinkGroupDto {
  groupJid: string;
  parentCommunityJid: string;
}

export class CommunityUnlinkGroupDto {
  groupJid: string;
  parentCommunityJid: string;
}

export class CommunityInviteCodeDto {
  jid: string;
}

export class CommunityRevokeInviteDto {
  jid: string;
}

export class CommunityAcceptInviteDto {
  code: string;
}

export class CommunityRevokeInviteV4Dto {
  communityJid: string;
  invitedJid: string;
}

export class CommunityAcceptInviteV4Dto {
  key: string;
  inviteMessage: any;
}

export class CommunityGetInviteInfoDto {
  code: string;
}

export class CommunityToggleEphemeralDto {
  ephemeralExpiration: number;
}

export class CommunityFetchLinkedGroupsDto {
  jid: string;
}

export class CommunityRequestParticipantsUpdateDto {
  participants: string[];
  action: 'approve' | 'reject';
}
