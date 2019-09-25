package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;

@Entity
@Getter @Builder
public class Condominio {

	@Id
	private Long id;
	private String nome;
}
