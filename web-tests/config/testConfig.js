/**
 * Configurações centralizadas para os testes
 * Facilita manutenção e permite diferentes configurações por ambiente
 */
import { TIMEOUTS } from '../constants/timeouts';

export const TEST_CONFIG = {
  // Timeouts
  timeouts: {
    elementVisibility: TIMEOUTS.ELEMENT_VISIBILITY,
    pageLoad: TIMEOUTS.PAGE_LOAD,
    actionDelay: TIMEOUTS.ACTION_DELAY,
    networkRequest: TIMEOUTS.NETWORK_REQUEST
  },

  // Configurações de retry
  retry: {
    attempts: 2,
    delay: 1000
  },

  // Configurações de espera
  wait: {
    afterAction: TIMEOUTS.ACTION_DELAY,
    afterNavigation: TIMEOUTS.PAGE_LOAD
  },

  // Configurações de usuários padrão
  defaultUsers: {
    valid: 'validUser',
    invalid: 'invalidUser'
  },

  // Configurações de produtos
  products: {
    defaultIndex: 0
  }
};

