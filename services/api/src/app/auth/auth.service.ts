import { subject as typeSubject } from '@casl/ability';
import { AuthorizeParams, AuthService } from '@entities/auth-info';
import { MembershipsRepository } from '@entities/memberships.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { defineRolesForUser } from './permissions/roles';

@Injectable()
export class CaslAuthService implements AuthService {
  constructor(private readonly membershipsRepo: MembershipsRepository) {}

  async authorize({
    user,
    subjectType,
    subject,
    action,
    message,
  }: AuthorizeParams) {
    const memberships = await this.membershipsRepo.getMemberships(user.id);
    const ability = defineRolesForUser(user, memberships);
    if (!ability.can(action, typeSubject(subjectType, subject))) {
      throw new UnauthorizedException(message ?? defaultMessage);
    }
  }
}

const defaultMessage = 'You do not have permission to perform this action.';
