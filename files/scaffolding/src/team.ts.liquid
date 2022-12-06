import * as {{pluginName.camel}} from '{{cdktfProviderPackage}}';
import { BaseProps, BaseTeam, overRecord, TeamBaseProps } from '@skeptools/skep-core';
import { Construct } from 'constructs';
import { Organization } from './organization';
import { Person, PersonProps } from './person';

export interface TeamProps extends BaseProps {
  readonly foo: string
}

export class Team<
  TeamTypeType extends string,
  PersonKeyType extends string,
  RoleType
> extends BaseTeam<
  PersonKeyType,
  RoleType,
  PersonProps,
  Person<RoleType>,
  TeamTypeType,
  TeamProps
  > {
  constructor(
    scope: Construct,
    namespace: string,
    org: Organization,
    people: Record<PersonKeyType, Person<RoleType>>,
    config: TeamProps & TeamBaseProps<PersonKeyType, TeamTypeType>,
  ) {
    super(scope, namespace, people, config);
  }

  get foo(): string {
    return this._props.foo;
  }
}
