import AccountType from './sm-account-type';
import Gender from './sm-gender';
import ResidentType from './sm-resident-type';
import ResidentRelationship from './sm-resident-relationship';
import RegulationCategory from './sm-regulation-category';
import RegulationSubCategory from './sm-regulation-subcategory';
import StaffAccountType from './sm-staff-account-type';
import FloorDirection from './sm-floor-direction';
import ConversationType from './sm-conversation-type';
import ConversationStatus from './sm-conversation-status';
import ServiceType from './sm-service-type';
import YesNo from './sm-yes-no';
import Description from './sm-description';
import Status from './sm-status';
import TemplateGroup from './sm-template-group';
import MessageType from './sm-message-type';
import MessageStatus from './sm-message-status';
import InvoiceStatus from './sm-invoice-status';
import PaymentMethod from './sm-payment-method';

export default angular.module('app.directives.components', [])
    .directive('smAccountType', () => new AccountType)
    .directive('smGender', () => new Gender)
    .directive('smResidentType', () => new ResidentType)
    .directive('smResidentRelationship', () => new ResidentRelationship)
    .directive('smRegulationCategory', () => new RegulationCategory)
    .directive('smRegulationSubcategory', () => new RegulationSubCategory)
    .directive('smStaffAccountType', () => new StaffAccountType)
    .directive('smFloorDirection', () => new FloorDirection)
    .directive('smConversationType', () => new ConversationType)
    .directive('smConversationStatus', () => new ConversationStatus)
    .directive('smServiceType', () => new ServiceType)
    .directive('smYesNo', () => new YesNo)
    .directive('smStatus', () => new Status)
    .directive('smDescription', () => new Description)
    .directive('smMessageType', () => new MessageType)
    .directive('smMessageStatus', () => new MessageStatus)
    .directive('smInvoiceStatus', () => new InvoiceStatus)
    .directive('smTemplateGroup', () => new TemplateGroup)
    .directive('smPaymentMethod', () => new PaymentMethod)
    .name;