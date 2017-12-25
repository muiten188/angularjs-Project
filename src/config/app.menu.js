const APP_MENU = [
    {
        "code": "BUILDING",
        "name": "MENU.BUILDING",
        "state": "building",
        "icon": "fa fa-building",
        "show": true,
        "children": [],
        "roles": ["ROLE.BUILDING.CREATE", "ROLE.BUILDING.UPDATE", "ROLE.BUILDING.DELETE", "ROLE.BUILDING.DELETE_MULTI"]
    },
    {
        "code": "APARTMENT",
        "name": "MENU.APARTMENT",
        "state": "apartment",
        "icon": "fa fa-home",
        "show": true,
        "children": [],
        "roles": ["ROLE.APARTMENT.CREATE", "ROLE.APARTMENT.UPDATE", "ROLE.APARTMENT.DELETE", "ROLE.APARTMENT.DELETE_MULTI"]
    },
    {
        "code": "GROUP",
        "name": "MENU.GROUP",
        "state": "group",
        "icon": "fa fa-users",
        "show": true,
        "children": [],
        "roles": ["ROLE.GROUP.CREATE", "ROLE.GROUP.UPDATE", "ROLE.GROUP.DELETE", "ROLE.GROUP.DELETE_MULTI"]
    },
    {
        "code": "RESIDENT",
        "name": "MENU.RESIDENT",
        "state": "resident",
        "icon": "fa fa-user-o",
        "show": true,
        "children": [],
        "roles": ["ROLE.RESIDENT.CREATE", "ROLE.RESIDENT.UPDATE", "ROLE.RESIDENT.DELETE", "ROLE.RESIDENT.DELETE_MULTI"]
    },
    {
        "code": "CONVERSATION",
        "name": "MENU.CONVERSATION",
        "state": "conversation",
        "icon": "fa fa-universal-access",
        "show": true,
        "children": [],
        "roles": ["ROLE.CONVERSATION.CREATE", "ROLE.CONVERSATION.UPDATE", "ROLE.CONVERSATION.DELETE", "ROLE.CONVERSATION.DELETE_MULTI"]
    },
    {
        "code": "INFO",
        "name": "MENU.INFO",
        "state": "info",
        "icon": "fa fa-info",
        "show": true,
        "children": [],
        "roles": ["ROLE.INFO.UPDATE"]
    },
    {
        "code": "DATAINPUT",
        "name": "MENU.DATAINPUT",
        "state": "datainput",
        "icon": "fa fa-database",
        "show": true,
        "children": [],
        "roles": ["ROLE.SERVICE.UPDATE"]
    },
    {
        "code": "IMPORTDATA",
        "name": "MENU.IMPORTDATA",
        "state": "importdata",
        "icon": "fa fa-upload",
        "show": true,
        "children": [],
        "roles": ["ROLE.SERVICE.UPDATE"]
    },
    {
        "code": "INVOICE",
        "name": "MENU.INVOICE",
        "state": "invoice",
        "icon": "fa fa-file-text-o",
        "show": true,
        "children": [],
        "roles": ["ROLE.SERVICE.UPDATE"]
    },
    {
        "code": "PAYMENT",
        "name": "MENU.PAYMENT",
        "state": "payment",
        "icon": "fa fa-credit-card-alt",
        "show": true,
        "children": [],
        "roles": ["ROLE.SERVICE.UPDATE"]
    },
    // {
    //     "code": "REQUESTUPDATE",
    //     "name": "MENU.REQUEST_UPDATE",
    //     "state": "request-update",
    //     "icon": "fa fa-credit-card-alt",
    //     "show": true,
    //     "children": [],
    //     "roles": ["ROLE.SERVICE.UPDATE"]
    // },
    {
        "code": "SETTING",
        "name": "MENU.SETTING",
        "state": "",
        "icon": "fa fa-cog",
        "show": true,
        "children": [
            {
                "code": "STAFF",
                "name": "MENU.STAFF",
                "state": "staff",
                // "icon": "fa fa-user-circle-o",
                "show": true,
                "children": [],
                "roles": ["ROLE.STAFF.CREATE", "ROLE.STAFF.UPDATE", "ROLE.STAFF.DELETE", "ROLE.STAFF.DELETE_MULTI"]
            },
            {
                "code": "USER",
                "name": "MENU.USER",
                "state": "user",
                // "icon": "fa fa-user",
                "show": true,
                "children": [],
                "roles": ["ROLE.USER.CREATE", "ROLE.USER.UPDATE", "ROLE.USER.DELETE", "ROLE.USER.DELETE_MULTI"]
            },
            {
                "code": "ROLE_GROUP",
                "name": "MENU.ROLE_GROUP",
                "state": "role-group",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.ROLE_GROUP.CREATE", "ROLE.ROLE_GROUP.UPDATE", "ROLE.ROLE_GROUP.DELETE", "ROLE.ROLE_GROUP.DELETE_MULTI"]
            },
            {
                "code": "REQUEST_CHANGE",
                "name": "MENU.REQUEST_CHANGE",
                "state": "request-change",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.REQUEST_CHANGE.ACCEPT", "ROLE.REQUEST_CHANGE.REJECT"]
            },
            {
                "code": "TEMPLATE",
                "name": "MENU.TEMPLATE",
                "state": "template",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.TEMPLATE.CREATE", "ROLE.TEMPLATE.UPDATE", "ROLE.TEMPLATE.DELETE", "ROLE.TEMPLATE.DELETE_MULTI"]
            },
            {
                "code": "SERVICE",
                "name": "MENU.SERVICE",
                "state": "service",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.SERVICE.CREATE", "ROLE.SERVICE.UPDATE", "ROLE.SERVICE.DELETE", "ROLE.SERVICE.DELETE_MULTI"]
            },
            {
                "code": "SERVICE_REGISTRATION",
                "name": "MENU.SERVICE_REGISTRATION",
                "state": "service-registration",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.SERVICE_REGISTRATION.CREATE", "ROLE.SERVICE_REGISTRATION.UPDATE", "ROLE.SERVICE_REGISTRATION.DELETE", "ROLE.SERVICE_REGISTRATION.DELETE_MULTI"]
            },
            {
                "code": "APARTMENT_MESSAGE",
                "name": "MENU.APARTMENT_MESSAGE",
                "state": "apartment-message",
                // "icon": "fa fa-universal-access",
                "show": true,
                "children": [],
                "roles": ["ROLE.APARTMENT_MESSAGE.CREATE", "ROLE.APARTMENT_MESSAGE.UPDATE", "ROLE.APARTMENT_MESSAGE.DELETE", "ROLE.APARTMENT_MESSAGE.DELETE_MULTI"]
            }
        ]
    }
];

export default APP_MENU;