import { JSONSchema7 } from 'json-schema';
import { v4 } from 'uuid';

export const createCommunitySchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    subject: { type: 'string', minLength: 1, maxLength: 100 },
    description: { type: 'string', maxLength: 500 },
  },
  required: ['subject'],
  additionalProperties: false,
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
  additionalProperties: false,
};

export const communityParticipantsUpdateSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    participants: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 1,
      maxItems: 100
    },
    action: { 
      type: 'string', 
      enum: ['promote', 'demote', 'add', 'remove'] 
    },
  },
  required: ['communityJid', 'participants', 'action'],
  additionalProperties: false,
};

export const communityPictureSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    image: { type: 'string', minLength: 1 },
  },
  required: ['communityJid', 'image'],
  additionalProperties: false,
};

export const communitySettingUpdateSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    setting: { 
      type: 'string', 
      enum: ['announcement', 'not_announcement'] 
    },
  },
  required: ['communityJid', 'setting'],
  additionalProperties: false,
};

export const communityMemberAddModeSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    mode: { 
      type: 'string', 
      enum: ['admin_add', 'everyone_add'] 
    },
  },
  required: ['communityJid', 'mode'],
  additionalProperties: false,
};

export const communityJidSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
  },
  required: ['communityJid'],
  additionalProperties: false,
};

export const communityGroupJidSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    groupJid: { type: 'string', minLength: 1 },
  },
  required: ['communityJid', 'groupJid'],
  additionalProperties: false,
};

export const communityInviteSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    inviteCode: { type: 'string', minLength: 1 },
  },
  required: ['communityJid', 'inviteCode'],
  additionalProperties: false,
};

export const communityAcceptInviteSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    inviteCode: { type: 'string', minLength: 1 },
  },
  required: ['inviteCode'],
  additionalProperties: false,
};

export const communitySendInviteSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    description: { type: 'string', maxLength: 500 },
    numbers: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 1,
      maxItems: 100
    },
  },
  required: ['communityJid', 'description', 'numbers'],
  additionalProperties: false,
};

export const updateCommunityDescriptionSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    description: { type: 'string', maxLength: 500 },
  },
  required: ['communityJid', 'description'],
  additionalProperties: false,
};

export const updateCommunitySubjectSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    communityJid: { type: 'string', minLength: 1 },
    subject: { type: 'string', minLength: 1, maxLength: 100 },
  },
  required: ['communityJid', 'subject'],
  additionalProperties: false,
};
