# These settings are synced to GitHub by https://probot.github.io/apps/settings/

repository:
  # See https://docs.github.com/en/rest/reference/repos#update-a-repository for all available settings.
  name: {{name}}
  description: {{description}}
  homepage: https://github.com/{{user}}/{{name}}
  topics: {{keywords}}
  private: false
  has_issues: true
  has_projects: false
  has_wiki: true
  has_downloads: false
  default_branch: main
  allow_merge_commit: false
  allow_squash_merge: true
  allow_rebase_merge: true
  delete_branch_on_merge: true
  enable_automated_security_fixes: true
  enable_vulnerability_alerts: true
  has_discussions: true
  allow_auto_merge: true
  allow_update_branch: true
  security_and_analysis:
    secret_scanning:
      status: enabled
    secret_scanning_push_protection:
      status: enabled

branches:
  - name: main
    # https://docs.github.com/en/rest/reference/repos#update-branch-protection
    # Branch Protection settings. Set to null to disable
    protection:
      required_pull_request_reviews: null
      required_status_checks:
        strict: true
        contexts:
          - pr_check
      enforce_admins: false
      required_linear_history: true
      restrictions: null
      allow_deletions: false
