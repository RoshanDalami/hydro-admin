export const apiUrls = {
    auth: {
        login: {
            method: "POST",
            url: "/auth/login"
        }
    },
    activities: {
        create: {
            method: "POST",
            url: "/activities"
        },
        get: {
            method: "GET",
            url: "/activities"
        },
        update: {
            method: "PATCH",
            url: "/activities"
        },
        getById: {
            method: "GET",
            url: "/activities"
        },
        deleteById: {
            method: "DELETE",
            url: "/activities"
        },
        deleteImage: {
            method: "DELETE",
            url: "/activities/image"
        }
    },
    notices: {
        create: {
            method: "POST",
            url: "/notice"
        },
        get: {
            method: "GET",
            url: "/notice"
        },
        update: {
            method: "PATCH",
            url: "/notice"
        },
        getById: {
            method: "GET",
            url: "/notice"
        },
        deleteById: {
            method: "DELETE",
            url: "/notice"
        },
        deleteMedia: {
            method: "DELETE",
            url: "/notice/media"
        },
        noticeFront: {
            method: "GET",
            url: "/notice/front"
        }
    },
    gallery: {
        category: {
            create: {
                method: "POST",
                url: "/gallery/category"
            },
            get: {
                method: "GET",
                url: "/gallery/category"
            },
            update: {
                method: "PATCH",
                url: "/gallery/category"
            },
            getById: {
                method: "GET",
                url: "/gallery/category"
            },
            deleteById: {
                method: "DELETE",
                url: "/gallery/category"
            }
        },
        image: {
            create: {
                method: "POST",
                url: "/gallery/image"
            },
            get: {
                method: "GET",
                url: "/gallery/image"
            },
            update: {
                method: "GET",
                url: "/gallery/image"
            },
            getImageById: {
                method: "GET",
                url: "/gallery/image"
            },
            deleteImageById: {
                method: "DELETE",
                url: "/gallery/image"
            },
            getImageByCategory: {
                method: "GET",
                url: "/gallery/image/category"
            }
        }
    },
    banner: {
        create: {
            method: "POST",
            url: "/banner"
        },
        get: {
            method: "GET",
            url: "/banner"
        },
        update: {
            method: "PATCH",
            url: "/banner"
        },
        getById: {
            method: "GET",
            url: "/banner"
        },
        deleteById: {
            method: "DELETE",
            url: "/banner"
        }
    },
    role: {
        create: {
            method: "POST",
            url: "/role"
        },
        get: {
            method: "GET",
            url: "/role"
        },
        update: {
            method: "PATCH",
            url: "/role"
        },
        getById: {
            method: "GET",
            url: "/role"
        },
        deleteById: {
            method: "DELETE",
            url: "/role"
        }
    },
    position: {
        create: {
            method: "POST",
            url: "/position"
        },
        get: {
            method: "GET",
            url: "/position"
        },
        update: {
            method: "PATCH",
            url: "/position"
        },
        getById: {
            method: "GET",
            url: "/position"
        },
        deleteById: {
            method: "DELETE",
            url: "/position"
        }
    },
    teamCategory: {
        create: {
            method: "POST",
            url: "/team-category"
        },
        get: {
            method: "GET",
            url: "/team-category"
        },
        update: {
            method: "PATCH",
            url: "/team-category"
        },
        getById: {
            method: "GET",
            url: "/team-category"
        },
        deleteById: {
            method: "DELETE",
            url: "/team-category"
        }
    },
    teamMember: {
        create: {
            method: "POST",
            url: "/team-member"
        },
        get: {
            method: "GET",
            url: "/team-member"
        },
        update: {
            method: "PATCH",
            url: "/team-member"
        },
        getById: {
            method: "GET",
            url: "/team-member"
        },
        deleteById: {
            method: "DELETE",
            url: "/team-member"
        }
    },
    logo: {
        create: {
            method: "POST",
            url: "/logo"
        },
        get: {
            method: "GET",
            url: "/logo"
        },
        getFrist: {
            method: "GET",
            url: "/logo/first"
        },
        update: {
            method: "PATCH",
            url: "/logo"
        }
    },
    about: {
        create: {
            method: "POST",
            url: "/about"
        },
        get: {
            method: "GET",
            url: "/about"
        },
        patch: {
            method: "PATCH",
            url: "/about"
        },
        getById: {
            method: "GET",
            url: "/about"
        },
        deleteById: {
            method: "DELETE",
            url: "/about"
        }

    },
    health: {
        get: {
            method: "GET",
            url: "/health"
        }
    },
    project: {
        create: {
            method: "POST",
            url: "/project"
        },
        get: {
            method: "GET",
            url: "/project"
        },
        getById: {
            method: "GET",
            url: "/project"
        },
        update: {
            method: "PATCH",
            url: "/project"
        },
        deleteById: {
            method: "DELETE",
            url: "/project"
        },
        deleteImageById: {
            method: "DELETE",
            url: "/project/image"
        }
    },
    userMessage: {
        get: {
            method: "GET",
            url: "/user-message"
        },
        getMessageById: {
            method: "GET",
            url: "/user-message"
        },
        update: {
            method: "PATCH",
            url: "/user-message"
        },
        delete: {
            method: "DELETE",
            url: "/user-message"
        }
    }
}