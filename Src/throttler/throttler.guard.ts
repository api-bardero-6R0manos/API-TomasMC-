import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler';

const VIP_LIMITS = {
  'DEIV_6Ro.manos13_60K': 60000,
  'crocraxker': 60000,
  'default': 100
};

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  async handleRequest(context: ExecutionContext, limit: number, ttl: number) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    const vipLimit = VIP_LIMITS[apiKey] || VIP_LIMITS['default'];
    request.headers['x-vip-id'] = apiKey || 'anonymous';

    return super.handleRequest(context, vipLimit, 1000);
  }
}
