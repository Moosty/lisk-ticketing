export const createOrganizerSchema = {
  $id: "lisk/organizer/create",
  type: "object",
  required: ["organization"],
  properties: {
    organization: {
      dataType: "string",
      fieldNumber: 1,
      minLength: 1,
      maxLength: 50,
    }
  }
}

export const cancelEventSchema = {
  $id: "lisk/event/cancel",
  type: "object",
  required: ["id"],
  properties: {
    id: {
      dataType: "string",
      fieldNumber: 1,
    }
  }
}

export const buyTicketSchema = {
  $id: "lisk/tickets/buy",
  type: "object",
  required: ["eventId", "typeId", "value"],
  properties: {
    eventId: {
      dataType: "string",
      fieldNumber: 1,
    },
    typeId: {
      dataType: "uint32",
      fieldNumber: 2,
    },
    value: {
      dataType: "uint64",
      fieldNumber: 3,
    }
  }
}

export const buyMarketTicketSchema = {
  $id: "lisk/tickets/buymarket",
  type: "object",
  required: ["marketId"],
  properties: {
    marketId: {
      dataType: "bytes",
      fieldNumber: 1,
    },
  }
}

export const scanTicketSchema = {
  $id: "lisk/tickets/scan",
  type: "object",
  required: ["ticketId", "ownerId"],
  properties: {
    ticketId: {
      dataType: "bytes",
      fieldNumber: 1,
    },
    ownerId: {
      dataType: "bytes",
      fieldNumber: 2,
    },
  }
}

export const sellTicketSchema = {
  $id: "lisk/tickets/sell",
  type: "object",
  required: ["ticketId", "price"],
  properties: {
    ticketId: {
      dataType: "bytes",
      fieldNumber: 1,
    },
    price: {
      dataType: "uint64",
      fieldNumber: 2,
    },
  }
}

export const transferTicketSchema = {
  $id: "lisk/tickets/transfer",
  type: "object",
  required: ["ticketId", "recipientAddress"],
  properties: {
    ticketId: {
      dataType: "bytes",
      fieldNumber: 1,
    },
    recipientAddress: {
      dataType: "bytes",
      fieldNumber: 2,
    },
  }
}

export const createEventSchema = {
  $id: "lisk/event/create",
  type: "object",
  required: ["eventData", "ticketData", "resellData"],
  properties: {
    eventData: {
      type: "object",
      fieldNumber: 1,
      required: ["title", "location", "date", "duration"],
      properties: {
        title: {
          dataType: "string",
          fieldNumber: 1,
          minLength: 10,
          maxLength: 100,
        },
        location: {
          dataType: "string",
          fieldNumber: 2,
          minLength: 3,
          maxLength: 50,
        },
        date: {
          dataType: "uint64",
          fieldNumber: 3,
        },
        duration: {
          dataType: "uint32",
          fieldNumber: 4
        },
        site: {
          dataType: "string",
          fieldNumber: 5,
          minLength: 0,
          maxLength: 200,
        },
        image: {
          dataType: "string",
          fieldNumber: 6,
          minLength: 0,
          maxLength: 255,
        },
        category: {
          dataType: "uint32",
          fieldNumber: 7,
        },
      },
    },
    ticketData: {
      type: "array",
      minItems: 1,
      maxItems: 20,
      fieldNumber: 2,
      items: {
        type: "object",
        required: ["startSellTimestamp", "id", "name", "price", "amount"],
        properties: {
          startSellTimestamp: {
            fieldNumber: 1,
            dataType: "uint64",
          },
          id: {
            fieldNumber: 2,
            dataType: "uint32",
          },
          name: {
            fieldNumber: 3,
            dataType: "string",
            minLength: 5,
            maxLength: 50,
          },
          price: {
            fieldNumber: 4,
            dataType: "uint64",
          },
          amount: {
            fieldNumber: 5,
            dataType: "uint32",
          },
          sold: {
            fieldNumber: 6,
            dataType: "uint32",
            default: 0,
          },
        },
      },
    },
    resellData: {
      type: "object",
      fieldNumber: 3,
      required: ["allowed", "maximumResellPercentage", "resellOrganiserFee"],
      properties: {
        allowed: {
          fieldNumber: 1,
          dataType: "boolean"
        },
        maximumResellPercentage: {
          fieldNumber: 2,
          dataType: "uint32",
        },
        resellOrganiserFee: {
          fieldNumber: 3,
          dataType: "uint32",
        },
      },
    },
  }
}

export const sprinklerSchema = {
  $id: "lisk/token/sprinkle",
  type: "object",
  required: ["username"],
  properties: {
    username: {
      fieldNumber: 1,
      dataType: "string",
      minLength: 3,
      maxLength: 50
    }
  }
}
