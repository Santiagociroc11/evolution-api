export class CreateCommunityDto {
  subject: string;
  description: string;
}

export class CreateCommunityGroupDto {
  subject: string;
  participants: string[];
  parentCommunityJid: string;
}

export class CommunityParticipantsUpdateDto {
  communityJid: string;
  participants: string[];
  action: 'promote' | 'demote' | 'add' | 'remove';
}

export class CommunityPictureDto {
  communityJid: string;
  image: string;
}

export class CommunitySettingUpdateDto {
  communityJid: string;
  setting: 'announcement' | 'not_announcement';
}

export class CommunityMemberAddModeDto {
  communityJid: string;
  mode: 'admin_add' | 'everyone_add';
}

export class CommunityJid {
  communityJid: string;
}

export class CommunityGroupJid {
  communityJid: string;
  groupJid: string;
}

export class CommunityInviteDto {
  communityJid: string;
  inviteCode: string;
}

export class CommunityAcceptInviteDto {
  inviteCode: string;
}

export class CommunitySendInviteDto {
  communityJid: string;
  description: string;
  numbers: string[];
}
