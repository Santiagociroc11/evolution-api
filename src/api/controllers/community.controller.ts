import { InstanceDto } from '@api/dto/instance.dto';
import {
  CreateCommunityDto,
  CreateCommunityGroupDto,
  CommunityParticipantsUpdateDto,
  CommunityPictureDto,
  CommunitySettingUpdateDto,
  CommunityMemberAddModeDto,
  CommunityJid,
  CommunityGroupJid,
  CommunityInviteDto,
  CommunityAcceptInviteDto,
  CommunitySendInviteDto,
} from '@api/dto/community.dto';
import { WAMonitoringService } from '@api/services/wa-monitoring.service';

export class CommunityController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  /**
   * Crear una nueva comunidad de WhatsApp
   */
  public async createCommunity(instance: InstanceDto, data: CreateCommunityDto) {
    return this.waMonitor.waInstances[instance.instanceName].createCommunity(data);
  }

  /**
   * Crear un grupo dentro de una comunidad
   */
  public async createCommunityGroup(instance: InstanceDto, data: CreateCommunityGroupDto) {
    return this.waMonitor.waInstances[instance.instanceName].createCommunityGroup(data);
  }

  /**
   * Actualizar participantes de una comunidad
   */
  public async communityParticipantsUpdate(instance: InstanceDto, data: CommunityParticipantsUpdateDto) {
    return this.waMonitor.waInstances[instance.instanceName].communityParticipantsUpdate(data);
  }

  /**
   * Actualizar foto de la comunidad
   */
  public async updateCommunityPicture(instance: InstanceDto, data: CommunityPictureDto) {
    return this.waMonitor.waInstances[instance.instanceName].updateCommunityPicture(data);
  }

  /**
   * Actualizar configuración de la comunidad
   */
  public async communitySettingUpdate(instance: InstanceDto, data: CommunitySettingUpdateDto) {
    return this.waMonitor.waInstances[instance.instanceName].communitySettingUpdate(data);
  }

  /**
   * Configurar modo de agregar miembros a la comunidad
   */
  public async communityMemberAddMode(instance: InstanceDto, data: CommunityMemberAddModeDto) {
    return this.waMonitor.waInstances[instance.instanceName].communityMemberAddMode(data);
  }

  /**
   * Obtener información de una comunidad
   */
  public async getCommunity(instance: InstanceDto, data: CommunityJid) {
    return this.waMonitor.waInstances[instance.instanceName].getCommunity(data);
  }

  /**
   * Obtener grupos de una comunidad
   */
  public async getCommunityGroups(instance: InstanceDto, data: CommunityJid) {
    return this.waMonitor.waInstances[instance.instanceName].getCommunityGroups(data);
  }

  /**
   * Generar código de invitación para la comunidad
   */
  public async generateCommunityInvite(instance: InstanceDto, data: CommunityJid) {
    return this.waMonitor.waInstances[instance.instanceName].generateCommunityInvite(data);
  }

  /**
   * Revocar código de invitación de la comunidad
   */
  public async revokeCommunityInvite(instance: InstanceDto, data: CommunityJid) {
    return this.waMonitor.waInstances[instance.instanceName].revokeCommunityInvite(data);
  }

  /**
   * Aceptar invitación a comunidad
   */
  public async acceptCommunityInvite(instance: InstanceDto, data: CommunityAcceptInviteDto) {
    return this.waMonitor.waInstances[instance.instanceName].acceptCommunityInvite(data);
  }

  /**
   * Enviar invitación a comunidad por número
   */
  public async sendCommunityInvite(instance: InstanceDto, data: CommunitySendInviteDto) {
    return this.waMonitor.waInstances[instance.instanceName].sendCommunityInvite(data);
  }

  /**
   * Eliminar grupo de la comunidad
   */
  public async deleteCommunityGroup(instance: InstanceDto, data: CommunityGroupJid) {
    return this.waMonitor.waInstances[instance.instanceName].deleteCommunityGroup(data);
  }

  /**
   * Actualizar descripción de la comunidad
   */
  public async updateCommunityDescription(instance: InstanceDto, data: { communityJid: string; description: string }) {
    return this.waMonitor.waInstances[instance.instanceName].updateCommunityDescription(data);
  }

  /**
   * Actualizar nombre de la comunidad
   */
  public async updateCommunitySubject(instance: InstanceDto, data: { communityJid: string; subject: string }) {
    return this.waMonitor.waInstances[instance.instanceName].updateCommunitySubject(data);
  }
}
