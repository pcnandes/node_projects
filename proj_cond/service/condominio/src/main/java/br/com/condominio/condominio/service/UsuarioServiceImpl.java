package br.com.condominio.condominio.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.condominio.condominio.dto.UsuarioDTO;
import br.com.condominio.condominio.model.Usuario;
import br.com.condominio.condominio.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public UsuarioDTO buscarPorEmail(String email) {
		Optional<Usuario> retornoBanco = Optional.ofNullable(this.usuarioRepository.findByEmail(email));
		return convertToDTO(retornoBanco.get());
	}

	public void validarUsuarioBuscadoAlteracao(Usuario usuarioBuscado) {
		if (usuarioBuscado == null) {
			throw new IllegalArgumentException();
		}
	}

	public List<UsuarioDTO> listar() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		return (usuarios.stream().map(usuario -> convertToDTO(usuario))).collect(Collectors.toList());
	}

	private UsuarioDTO convertToDTO(Usuario usuario) {
		UsuarioDTO usuarioDTO = UsuarioDTO.builder().id(usuario.getId()).celular1(usuario.getCelular1())
				.celular2(usuario.getCelular2()).cpf(usuario.getCpf()).email(usuario.getEmail())
				.nome(usuario.getNome()).senha(usuario.getSenha()).telefone(usuario.getTelefone()).build();
		return usuarioDTO;
	}

	private Usuario convertToEntity(UsuarioDTO usuarioDTO) {
		Usuario usuario = Usuario.builder().id(usuarioDTO.getId()).celular1(usuarioDTO.getCelular1())
				.celular2(usuarioDTO.getCelular2()).cpf(usuarioDTO.getCpf()).email(usuarioDTO.getEmail())
				.nome(usuarioDTO.getNome()).senha(usuarioDTO.getSenha()).telefone(usuarioDTO.getTelefone()).build();
		return usuario;
	}

	public UsuarioDTO buscar(Long id) {
		return convertToDTO(usuarioRepository.findById(id).get());
	}

	public UsuarioDTO salvar(UsuarioDTO usuarioDTO) {
		return convertToDTO(usuarioRepository.save(convertToEntity(usuarioDTO)));
	}

	public void deletar(Long id) {
		usuarioRepository.deleteById(id);
	}

	public UsuarioDTO alterar(Long id, UsuarioDTO usuarioDTO) {
		validarUsuarioBuscadoAlteracao(usuarioRepository.findById(id).get());
		Usuario usuario = usuarioRepository.save(convertToEntity(usuarioDTO));
		return convertToDTO(usuario);
	}

	@Override
	public Usuario buscarUsuarioPorEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

}
