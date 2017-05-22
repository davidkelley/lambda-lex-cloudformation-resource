# Lambda Lex

The Lambda functions contained within this repository facilitate the setup and configuration of [AWS Lex](https://aws.amazon.com/lex/) resources, by providing a number of [custom Cloudformation resources](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html).

#### Bot

Creates an Amazon Lex conversational bot or replaces an existing bot.

See: [here](/functions/bot/schema.js) for expected payloads.

See: [API Documentation](http://docs.aws.amazon.com/goto/WebAPI/lex-models-2017-04-19/PutBot)

#### Intent

Creates an intent or replaces an existing intent.

To define the interaction between the user and your bot, you use one or more intents. For a pizza ordering bot, for example, you would create an `OrderPizza` intent.

See: [here](/functions/intent/schema.js) for expected payloads.

See: [API Documentation](http://docs.aws.amazon.com/goto/WebAPI/lex-models-2017-04-19/PutIntent)

#### Slot

Creates a custom slot type or replaces an existing custom slot type.

To create a custom slot type, specify a name for the slot type and a set of enumeration values, which are the values that a slot of this type can assume.

If you specify the name of an existing slot type, the fields in the request replace the existing values in the $LATEST version of the slot type. Amazon Lex removes the fields that you don't provide in the request. If you don't specify required fields, Amazon Lex throws an exception.

See: [here](/functions/slot/schema.js) for expected payloads.

See: [API Documentation](http://docs.aws.amazon.com/goto/WebAPI/lex-models-2017-04-19/PutSlotType)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/notonthehighstreet/lambda-lex-cloudformation-resource. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
