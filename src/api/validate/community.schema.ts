import { JSONSchema7 } from 'json-schema';
import { v4 } from 'uuid';

export const createCommunitySchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    subject: { type: 'string', minLength: 1, maxLength: 100 },
    body: { type: 'string', minLength: 1, maxLength: 500 },
  },
  required: ['subject', 'body'],
};

export const createCommunityGroupSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    subject: { type: 'string', minLength: 1, maxLength: 100 },
    participants: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 1,
      maxItems: 100
    },
    parentCommunityJid: { type: 'string', minLength: 1 },
  },
  required: ['subject', 'participants', 'parentCommunityJid'],
};

export const communityParticipantsUpdateSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    participants: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 1,
      maxItems: 100
    },
    action: { 
      type: 'string', 
      enum: ['add', 'remove', 'promote', 'demote'] 
    },
  },
  required: ['participants', 'action'],
};

export const communitySettingsSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    setting: { 
      type: 'string', 
      enum: ['announcement', 'not_announcement', 'locked', 'unlocked'] 
    },
  },
  required: ['setting'],
};

export const communityMemberAddModeSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    mode: { 
      type: 'string', 
      enum: ['admin_add', 'all_member_add'] 
    },
  },
  required: ['mode'],
};

export const communityJoinApprovalModeSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    mode: { 
      type: 'string', 
      enum: ['on', 'off'] 
    },
  },
  required: ['mode'],
};

export const communityUpdateSubjectSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    subject: { type: 'string', minLength: 1, maxLength: 100 },
  },
  required: ['subject'],
};

export const communityUpdateDescriptionSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    description: { type: 'string', maxLength: 500 },
  },
};

export const communityLinkGroupSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    groupJid: { type: 'string', minLength: 1 },
    parentCommunityJid: { type: 'string', minLength: 1 },
  },
  required: ['groupJid', 'parentCommunityJid'],
};

export const communityUnlinkGroupSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    groupJid: { type: 'string', minLength: 1 },
    parentCommunityJid: { type: 'string', minLength: 1 },
  },
  required: ['groupJid', 'parentCommunityJid'],
};

export const communityInviteCodeSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    jid: { type: 'string', minLength: 1 },
  },
  required: ['jid'],
};

export const communityRevokeInviteSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    jid: { type: 'string', minLength: 1 },
  },
  required: ['jid'],
};

export const communityAcceptInviteSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    code: { type: 'string', minLength: 1 },
  },
  required: ['code'],
};

export const communityRevokeInviteV4Schema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    invitedJid: { type: 'string', minLength: 1 },
  },
  required: ['communityJid', 'invitedJid'],
};

export const communityAcceptInviteV4Schema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    key: { type: 'string', minLength: 1 },
    inviteMessage: { type: 'object' },
  },
  required: ['key', 'inviteMessage'],
};

export const communityGetInviteInfoSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    code: { type: 'string', minLength: 1 },
  },
  required: ['code'],
};

export const communityToggleEphemeralSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    ephemeralExpiration: { type: 'number', minimum: 0, maximum: 31536000 },
  },
  required: ['ephemeralExpiration'],
};

export const communityFetchLinkedGroupsSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    jid: { type: 'string', minLength: 1 },
  },
  required: ['jid'],
};

export const communityRequestParticipantsUpdateSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    participants: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 1,
      maxItems: 100
    },
    action: { 
      type: 'string', 
      enum: ['approve', 'reject'] 
    },
  },
  required: ['participants', 'action'],
};
