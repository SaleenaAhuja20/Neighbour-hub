import { Injectable } from '@nestjs/common';

@Injectable()
export class ModeratorService {

  private profile = {
    id: 1,
    name: 'Moderator',
    email: 'moderator@example.com',
    phone: '03001234567',
    role: 'MODERATOR',
  };

  private settings = {
    notifications: true,
    darkMode: false,
    language: 'English',
  };

  private disputes = [
    {
      id: 1,
      user: 'Ali',
      provider: 'Ahmed',
      reason: 'Late service',
      description: 'Provider arrived 2 hours late.',
      status: 'Pending',
    },
    {
      id: 2,
      user: 'Sara',
      provider: 'Usman',
      reason: 'Poor quality',
      description: 'Provider delivered poor quality work.',
      status: 'Resolved',
    },
  ];

  getDashboard() {
    return {
      totalDisputes: this.disputes.length,
      pendingDisputes: this.disputes.filter(
        dispute => dispute.status === 'Pending',
      ).length,
      resolvedDisputes: this.disputes.filter(
        dispute => dispute.status === 'Resolved',
      ).length,
      flaggedContent: 6,
      conversations: 12,
    };
  }

  getDisputes() {
    return this.disputes;
  }

  getDisputeById(id: number) {
    return (
      this.disputes.find(dispute => dispute.id === id) || {
        message: 'Dispute not found',
      }
    );
  }

  getFlaggedContent() {
    return [
      {
        id: 1,
        type: 'Review',
        content: 'This review contains abusive language.',
      },
      {
        id: 2,
        type: 'Comment',
        content: 'Spam comment.',
      },
    ];
  }

  getConversations() {
    return [
      {
        id: 1,
        sender: 'Ali',
        receiver: 'Moderator',
        lastMessage: 'Please solve my dispute.',
      },
      {
        id: 2,
        sender: 'Sara',
        receiver: 'Moderator',
        lastMessage: 'Thank you.',
      },
    ];
  }

  getProfile() {
    return this.profile;
  }

  updateProfile(body: any) {
    this.profile = {
      ...this.profile,
      ...body,
    };

    return {
      message: 'Profile updated successfully.',
      profile: this.profile,
    };
  }

  getSettings() {
    return this.settings;
  }

  updateSettings(body: any) {
    this.settings = {
      ...this.settings,
      ...body,
    };

    return {
      message: 'Settings updated successfully.',
      settings: this.settings,
    };
  }
}