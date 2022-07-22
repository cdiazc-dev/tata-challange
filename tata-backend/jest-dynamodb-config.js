module.exports = {
    tables: [
        {
            TableName: "CharacterTable-unittest",
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            BillingMode: "PAY_PER_REQUEST",
        },
    ]
}