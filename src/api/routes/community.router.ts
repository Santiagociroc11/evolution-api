import { Router } from 'express';
import { RouterBroker } from '@api/abstract/router.abstract';
import { CommunityController } from '@api/controllers/community.controller';
import { InstanceGuard } from '@api/guards/instance.guard';
import { ApiKeyGuard } from '@api/guards/apikey.guard';
import { waMonitor } from '@api/server.module';
import {
  CreateCommunityDto,
  CreateCommunityGroupDto,
  CommunityParticipantsUpdateDto,
  CommunityPictureDto,
  CommunitySettingUpdateDto,
  CommunityMemberAddModeDto,
  CommunityJid,
  CommunityGroupJid,
  CommunityAcceptInviteDto,
  CommunitySendInviteDto,
} from '@api/dto/community.dto';
import {
  createCommunitySchema,
  createCommunityGroupSchema,
  communityParticipantsUpdateSchema,
  communityPictureSchema,
  communitySettingUpdateSchema,
  communityMemberAddModeSchema,
  communityJidSchema,
  communityGroupJidSchema,
  communityAcceptInviteSchema,
  communitySendInviteSchema,
  updateCommunityDescriptionSchema,
  updateCommunitySubjectSchema,
} from '@validate/community.validate';

export class CommunityRouter extends RouterBroker {
  constructor(...guards: any[]) {
    super();
    this.router = Router();
    this.router.use(...guards);
    this.router.use(new InstanceGuard().use);
    this.router.use(new ApiKeyGuard().use);

    const communityController = new CommunityController(waMonitor);

    // ==========================================
    // RUTAS DE COMUNIDADES WHATSAPP
    // ==========================================

    // Crear comunidad
    this.router.post(this.routerPath('create'), async (req, res) => {
      const response = await this.dataValidate<CreateCommunityDto>({
        request: req,
        schema: createCommunitySchema,
        ClassRef: CreateCommunityDto,
        execute: (instance, data) => communityController.createCommunity(instance, data),
      });
      res.status(201).json(response);
    });

    // Crear grupo en comunidad
    this.router.post(this.routerPath('create-group'), async (req, res) => {
      const response = await this.dataValidate<CreateCommunityGroupDto>({
        request: req,
        schema: createCommunityGroupSchema,
        ClassRef: CreateCommunityGroupDto,
        execute: (instance, data) => communityController.createCommunityGroup(instance, data),
      });
      res.status(201).json(response);
    });

    // Actualizar participantes de comunidad
    this.router.put(this.routerPath('participants'), async (req, res) => {
      const response = await this.dataValidate<CommunityParticipantsUpdateDto>({
        request: req,
        schema: communityParticipantsUpdateSchema,
        ClassRef: CommunityParticipantsUpdateDto,
        execute: (instance, data) => communityController.communityParticipantsUpdate(instance, data),
      });
      res.status(200).json(response);
    });

    // Actualizar foto de comunidad
    this.router.put(this.routerPath('picture'), async (req, res) => {
      const response = await this.dataValidate<CommunityPictureDto>({
        request: req,
        schema: communityPictureSchema,
        ClassRef: CommunityPictureDto,
        execute: (instance, data) => communityController.updateCommunityPicture(instance, data),
      });
      res.status(200).json(response);
    });

    // Actualizar configuración de comunidad
    this.router.put(this.routerPath('setting'), async (req, res) => {
      const response = await this.dataValidate<CommunitySettingUpdateDto>({
        request: req,
        schema: communitySettingUpdateSchema,
        ClassRef: CommunitySettingUpdateDto,
        execute: (instance, data) => communityController.communitySettingUpdate(instance, data),
      });
      res.status(200).json(response);
    });

    // Configurar modo de agregar miembros
    this.router.put(this.routerPath('member-add-mode'), async (req, res) => {
      const response = await this.dataValidate<CommunityMemberAddModeDto>({
        request: req,
        schema: communityMemberAddModeSchema,
        ClassRef: CommunityMemberAddModeDto,
        execute: (instance, data) => communityController.communityMemberAddMode(instance, data),
      });
      res.status(200).json(response);
    });

    // Obtener información de comunidad
    this.router.get(this.routerPath('get'), async (req, res) => {
      const response = await this.dataValidate<CommunityJid>({
        request: req,
        schema: communityJidSchema,
        ClassRef: CommunityJid,
        execute: (instance, data) => communityController.getCommunity(instance, data),
      });
      res.status(200).json(response);
    });

    // Obtener grupos de comunidad
    this.router.get(this.routerPath('groups'), async (req, res) => {
      const response = await this.dataValidate<CommunityJid>({
        request: req,
        schema: communityJidSchema,
        ClassRef: CommunityJid,
        execute: (instance, data) => communityController.getCommunityGroups(instance, data),
      });
      res.status(200).json(response);
    });

    // Generar código de invitación
    this.router.post(this.routerPath('generate-invite'), async (req, res) => {
      const response = await this.dataValidate<CommunityJid>({
        request: req,
        schema: communityJidSchema,
        ClassRef: CommunityJid,
        execute: (instance, data) => communityController.generateCommunityInvite(instance, data),
      });
      res.status(200).json(response);
    });

    // Revocar código de invitación
    this.router.delete(this.routerPath('revoke-invite'), async (req, res) => {
      const response = await this.dataValidate<CommunityJid>({
        request: req,
        schema: communityJidSchema,
        ClassRef: CommunityJid,
        execute: (instance, data) => communityController.revokeCommunityInvite(instance, data),
      });
      res.status(200).json(response);
    });

    // Aceptar invitación a comunidad
    this.router.post(this.routerPath('accept-invite'), async (req, res) => {
      const response = await this.dataValidate<CommunityAcceptInviteDto>({
        request: req,
        schema: communityAcceptInviteSchema,
        ClassRef: CommunityAcceptInviteDto,
        execute: (instance, data) => communityController.acceptCommunityInvite(instance, data),
      });
      res.status(200).json(response);
    });

    // Enviar invitación a comunidad
    this.router.post(this.routerPath('send-invite'), async (req, res) => {
      const response = await this.dataValidate<CommunitySendInviteDto>({
        request: req,
        schema: communitySendInviteSchema,
        ClassRef: CommunitySendInviteDto,
        execute: (instance, data) => communityController.sendCommunityInvite(instance, data),
      });
      res.status(200).json(response);
    });

    // Eliminar grupo de comunidad
    this.router.delete(this.routerPath('delete-group'), async (req, res) => {
      const response = await this.dataValidate<CommunityGroupJid>({
        request: req,
        schema: communityGroupJidSchema,
        ClassRef: CommunityGroupJid,
        execute: (instance, data) => communityController.deleteCommunityGroup(instance, data),
      });
      res.status(200).json(response);
    });

    // Actualizar descripción de comunidad
    this.router.put(this.routerPath('description'), async (req, res) => {
      const response = await this.dataValidate<{ communityJid: string; description: string }>({
        request: req,
        schema: updateCommunityDescriptionSchema,
        ClassRef: Object,
        execute: (instance, data) => communityController.updateCommunityDescription(instance, data),
      });
      res.status(200).json(response);
    });

    // Actualizar nombre de comunidad
    this.router.put(this.routerPath('subject'), async (req, res) => {
      const response = await this.dataValidate<{ communityJid: string; subject: string }>({
        request: req,
        schema: updateCommunitySubjectSchema,
        ClassRef: Object,
        execute: (instance, data) => communityController.updateCommunitySubject(instance, data),
      });
      res.status(200).json(response);
    });
  }
}
