package br.com.condominio.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Condominio {

	private Long id;
	private String nome;
}
