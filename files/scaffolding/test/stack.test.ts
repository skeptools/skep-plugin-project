import { OrganizationProps, PersonProps, SkepStack, TeamProps } from '@skeptools/skep-core';
import { App } from 'cdktf';
import { Factory } from '../src';

type RoleType = 'engineering' | 'product';

const fooBar = {
  firstName: 'Foo',
  lastName: 'Bar',
  emailAddress: 'foo.bar@example.com',
  role: 'engineering',
  integrations: {
    {{pluginName.camel}}: {
      foo: 'bar',
    },
  },
} as PersonProps<Integrations, RoleType>;

const balBaz = {
  firstName: 'Bal',
  lastName: 'Baz',
  emailAddress: 'bal.baz@example.com',
  role: 'product',
  integrations: {
    {{pluginName.camel}}: {
      foo: 'bal',
    },
  },
} as PersonProps<Integrations, RoleType>;

const people = { fooBar, balBaz };

const fooTeam = {
  name: 'Foo',
  leads: ['fooBar'],
  members: ['balBaz'],
  integrations: {
    {{pluginName.camel}}: {
      foo: 'bar',
    },
  },
} as TeamProps<Integrations, PeopleKeys>;

const barGuild = {
  name: 'Bar',
  leads: ['fooBar'],
  members: ['balBaz'],
  integrations: {
    {{pluginName.camel}}: {},
  },
  type: 'guild',
} as TeamProps<Integrations, PeopleKeys>;

const teams = { fooTeam, barGuild };

const organization: OrganizationProps<Integrations> = {
  name: 'Test',
  integrations: {
    {{pluginName.camel}}: {
      foo: 'baz',
    },
  },
};

type PeopleKeys = Extract<keyof typeof people, string>;
type TeamKeys = Extract<keyof typeof teams, string>;
interface Integrations {
    {{pluginName.camel}}: Factory<PeopleKeys, RoleType>;
}

export class TestSkepStack extends SkepStack<Integrations, PeopleKeys, TeamKeys, RoleType> {
  get defaultConfig() {
    return {
      team: {
        foo: 'bar',
      },
    };
  }

  load(
    orgConfig: OrganizationProps<Integrations>,
    peopleConfig: Record<PeopleKeys, PersonProps<Integrations, RoleType>>,
    teamConfig: Record<TeamKeys, TeamProps<Integrations, PeopleKeys>>,
  ): Integrations {
    const {{pluginName.camel}} = new Factory<PeopleKeys, RoleType>(
      this,
      '{{pluginName.camel}}',
      this.getOrganizationConfig(orgConfig, '{{pluginName.camel}}'),
      this.getPersonConfig(peopleConfig, '{{pluginName.camel}}'),
      this.getTeamConfig(teamConfig, '{{pluginName.camel}}'),
    );
    {{pluginName.camel}}.load();
    return { {{pluginName.camel}} };
  }
}

test('SkepStack', () => {
  const app = new App();
  new TestSkepStack(app, 'test-skep-stack', organization, people, teams);
  app.synth();
});