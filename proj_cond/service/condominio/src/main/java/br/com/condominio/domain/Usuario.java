package br.com.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Usuario {

	private Long id;
	private String email;
	private String perfis; // tabela de dominio
	private String cpf;
	private String nome;
	private String telefone;
	private String celular1; // Lista de telefones?
	private String celular2;
}
