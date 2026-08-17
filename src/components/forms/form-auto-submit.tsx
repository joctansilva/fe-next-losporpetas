'use client';

import { useEffect, useRef } from 'react';

/**
 * Faz o formulário de filtros enviar sozinho ao mudar um campo.
 *
 * Melhoria progressiva, não requisito: **sem JavaScript o formulário continua
 * funcionando** pelo botão "Filtrar". Este componente só remove o clique extra
 * para quem tem JS, que é o comportamento que se espera de um `<select>` de
 * filtro.
 *
 * Anexa o listener ao `<form>` ancestral em vez de exigir `onChange` em cada
 * campo — assim os campos continuam sendo HTML renderizado no servidor, e a
 * ilha client fica com ~15 linhas em vez de arrastar a barra inteira para o
 * cliente.
 */
export function FormAutoSubmit() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const form = anchorRef.current?.closest('form');
    if (!form) return;

    const submit = () => form.requestSubmit();
    form.addEventListener('change', submit);

    return () => form.removeEventListener('change', submit);
  }, []);

  return <span ref={anchorRef} hidden />;
}
