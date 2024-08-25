# frozen_string_literal: true

require 'i18n/backend/pluralization'
# rubocop:disable Lint/SendWithMixinArgument
I18n::Backend::Simple.send(:include, I18n::Backend::Pluralization)
# rubocop:enable Lint/SendWithMixinArgument
